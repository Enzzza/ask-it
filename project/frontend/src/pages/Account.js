import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import AccountPassword from '../components/account/AccountPassword';
import { useAuth } from '../contexts/AuthContext';
import { userController } from '../api/user';
import Alert from '@material-ui/lab/Alert';

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
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(0);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      setLoader(true);
      let {
        msg: userMsg,
        error: userError,
        user: fetchedUser,
      } = await userController.getUserById(auth.user.id);
      let {
        msg: questionsMsg,
        error: questionsError,
        count,
      } = await userController.getUserQuestions(auth.user.id);
      if (userError || questionsError) {
        setError(true);
        if (userError) {
          setErrors([...errors, userMsg]);
        } else if (questionsError) {
          setErrors([...errors, questionsMsg]);
        }
      } else {
        setLoader(false);
        setUser(fetchedUser);
        setQuestions(count);
      }
    })();

    return () => {};
  }, [auth.user.id]);

  if(!error){
    return (
      <>
        <Box m={5}>
          <Container maxWidth='lg'>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile user={user} questions={questions} loading={loading}/>
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
    )
  }else{
    return (
      <Box style={{marginTop:40, marginLeft:30, marginRight: 50}}>
        <div className={classes.root}>
          {errors.map((err) => (
            <Alert severity='error'>{err}</Alert>
          ))}
        </div>
      </Box>
    );
  }
  
};

export default Account;
