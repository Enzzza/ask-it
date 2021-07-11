import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue, grey } from '@material-ui/core/colors';
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles({
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
  timestampText: {
    fontSize: 12,
    color: grey[300],
  },
  userText: {
    fontSize: 12,
    color: lightBlue[500],
    textDecoration: 'none',
  },
});

const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

export default function BaseCard(props) {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={3} margin={1}>
        <Box display='flex' px={1} py='12px'>
            {props.sideComponent}
          <Box flexGrow={1}>
            <Box display='flex' flexDirection='column'>
              <RouterLink className={classes.title}>
                <Box component='span' marginBottom={1}>
                  handlebar: TypeError: (depth0 ||
                  container.hooks.helperMissing).call is not a function
                </Box>
              </RouterLink>

              <Box component='span' className={classes.subtitle} marginTop={2}>
                {truncate(`Even though the question is already asked it dont provide any
                solutions I am using handlebar as a templating engine for
                node+express. router.get`,200)}
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
                    asked 2 mins ago
                  </Box>
                  <Box display='flex' alignItems='center'>
                    <Avatar>S</Avatar>
                    <RouterLink className={classes.userText}>
                      <Box component='span' marginLeft={1}>
                        Enis Habul
                      </Box>
                    </RouterLink>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
