import React, { useState,useContext } from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../contexts/AuthContext';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SignInForm from '../components/forms/SignInForm';

import useCustomSnackbar from '../components/utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../contexts/SpinnerContext';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const methods = useForm({ resolver: yupResolver(schema) });

  const [redirect, setRedirect] = useState(false);
  const {isLoading,setLoaderState} = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar()

  const auth = useAuth();

  const formSubmitHandler = async ({ email, password }) => {
    setLoaderState(true);
    let {msg,user,error} = await auth.signin(email, password);
    if (!error) {
      snackbar.showSuccess(`Welcome ${user.displayName}`,"Close",() => {});
      setRedirect(true);
    }else{
      snackbar.showError(msg,"Close",() => {});
    }
      setLoaderState(false);
    
  };

  if (redirect) {
    return <Redirect to='/' />;
  }
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(formSubmitHandler)}
            className={classes.form}
          >
            <SignInForm />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={isLoading}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <RouterLink to='/sign-up' style={{ textDecoration: 'none' }}>
                  <Typography variant='body1' color='primary'>
                    Don't have an account? Sign Up
                  </Typography>
                </RouterLink>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </div>
    </Container>
  );
}
