import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue, grey, green } from '@material-ui/core/colors';
import { Link as RouterLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { publicController } from '../../api/public';
import { UserAvatar } from '../avatar/UserAvatar';
import Error from '../utils/Error';
import { ClassicSpinner } from 'react-spinners-kit';

const useStyles = makeStyles({
  mainTitle: {
    color: grey[200],
    marginBottom: 20,
  },
  title: {
    lineHeight: 1.3,
    fontWeight: 400,
    color: lightBlue[500],
    fontSize: 20,
    textDecoration: 'none',
  },
  subtitle: {
    textAlign: 'left',
    fontSize: 13,
    color: grey[200],
  },
  box: {
    backgroundColor: green[400],
    color: grey[200],
    padding: '13px',
    borderRadius: '5px',
    marginRight: '10px',
    fontWeight: 500,
    fontSize: 20,
  },
});
export default function TopUserList() {
  const classes = useStyles();
  const { isLoading, isError, data, error } = useQuery(
    ['users', 'answers', 'top'],
    () => publicController.getUsersWithMostAnswers()
  );

  if (isLoading) {
    return <ClassicSpinner loading={isLoading} />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <div>
      <Box textAlign='center' className={classes.mainTitle}>
        <Typography variant='h5' gutterBottom>
          Users with most answers
        </Typography>
      </Box>
      {data.length ? (
        <Paper elevation={3}>
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <Box>
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                  padding={1}
                  textAlign='center'
                >
                  <Box
                    display='flex'
                    flexDirection='column'
                    marginLeft={'10px'}
                    justifyContent='center'
                    alignItems='center'
                    flexBasis={'150px'}
                    minWidth={'100px'}
                  >
                    <RouterLink
                      className={classes.title}
                      to={`/users/profile/${item.id}`}
                    >
                      <Typography gutterBottom>@{item.displayName}</Typography>
                    </RouterLink>
                    <Box>
                      <UserAvatar user={item} spacing={6} />
                    </Box>
                  </Box>

                  <Box className={classes.box}>{item.answerCount}</Box>
                </Box>
              </Box>
              {index + 1 !== data.length && <Divider />}
            </React.Fragment>
          ))}
        </Paper>
      ) : (
        <Box>There is no answers yet!</Box>
      )}
    </div>
  );
}
