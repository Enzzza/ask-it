import { makeStyles } from '@material-ui/core';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import AccountPassword from '../components/account/AccountPassword';
import { useAuth } from '../contexts/AuthContext';
import { userController } from '../api/user';
import Alert from '@material-ui/lab/Alert';
import { useQuery } from 'react-query';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Account = () => {
  const auth = useAuth();
  const classes = useStyles();
  const { isError:isUserError,data: user } = useQuery(['users', auth.user.id], () =>
    userController.getUserById(auth.user.id)
  );

  const {
    isLoading,
    isError,
    data: questions,
  } = useQuery(['questions', { userId: auth.user.id }], () =>
    userController.getUserQuestions(auth.user.id),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (isError || isUserError) {
    return (
      <Box style={{ marginTop: 40, marginLeft: 30, marginRight: 50 }}>
        <div className={classes.root}>
          <Alert severity='error'>Server is down, please try again later!</Alert>
        </div>
      </Box>
    );
  }

  return (
    <>
      <Box m={5}>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={user.user} questions={questions.count}/>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
          <Box m={10}>
            <AccountPassword />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Account;
