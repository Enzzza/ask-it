import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue, grey } from '@material-ui/core/colors';
import { Link as RouterLink } from 'react-router-dom';
import GetHumanizedTime from '../../utils/GetHumanizedTime';
import { useQuery } from 'react-query';
import { userController } from '../../api/user';
import { UserAvatar } from '../avatar/UserAvatar';
import Error from '../utils/Error';
import LoadingSpinner from '../utils/LoadingSpinner';

const useStyles = makeStyles({
  title: {
    lineHeight: 1.3,
    fontWeight: 400,
    color: lightBlue[500],
    fontSize: 24,
    textDecoration: 'none',
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 16,
    color: grey[200],
  },
  timestampText: {
    fontSize: 12,
    color: grey[300],
  },
  userText: {
    fontSize: 15,
    color: lightBlue[500],
    textDecoration: 'none',
  },
});

const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

export default function BaseCard(props) {
  const classes = useStyles();

  const { data, isLoading, isError, error } = useQuery(
    ['users', props.question.userID],
    () => userController.getUserById(props.question.userID)
  );

  return (
    <Box display='flex' flexDirection='column'>
      <Paper elevation={3} margin={1}>
        <Box display='flex' px={1} py='12px'>
          {props.sideComponent}
          <Box flexGrow={1}>
            <Box display='flex' flexDirection='column'>
              {!props.isAnswer ? (
                <RouterLink
                  className={classes.title}
                  to={`/answers/${props.question.id}`}
                >
                  <Box component='span' marginBottom={1}>
                    {props.question.title}
                  </Box>
                </RouterLink>
              ) : (
                <Box
                  component='span'
                  marginBottom={1}
                  className={classes.title}
                >
                  {props.question.title}
                </Box>
              )}

              <Box component='span' className={classes.subtitle} marginTop={2}>
                {!props.isAnswer
                  ? truncate(props.question.body, 200)
                  : props.question.body}
              </Box>
              <Box display='flex' justifyContent='flex-end' marginTop={2}>
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  marginRight={5}
                >
                  <Box
                    component='span'
                    className={classes.timestampText}
                    marginBottom={1}
                  >
                    asked {GetHumanizedTime(props.question.createdAt)}
                  </Box>
                  {isLoading ? (
                    <LoadingSpinner isLoading={isLoading} />
                  ) : (
                    <Box display='flex' alignItems='center'>
                      <UserAvatar user={data} spacing={6} />
                      <RouterLink
                        className={classes.userText}
                        to={`/users/profile/${props.question.userID}`}
                      >
                        <Box component='span' marginLeft={1}>
                          @{data.displayName}
                        </Box>
                      </RouterLink>
                    </Box>
                  )}
                  {isError && <Error message={error.message} />}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>

      {props.isAnswer && props.actionComponent}
    </Box>
  );
}
