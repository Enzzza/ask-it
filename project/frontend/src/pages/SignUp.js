import React, { useState, useContext } from 'react';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useAuth } from '../contexts/AuthContext';
import SingUpForm from '../components/forms/SignUpForm';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import UsernameGenerator from 'username-generator';
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
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const schema = yup.object().shape({
    name: yup.string(),
    surname: yup.string(),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const methods = useForm({ resolver: yupResolver(schema) });

  const [redirect, setRedirect] = useState(false);
  const { isLoading, setLoaderState } = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar();
  const auth = useAuth();

  const formSubmitHandler = async (data) => {
    let displayName = UsernameGenerator.generateUsername();
    setLoaderState(true);
    let { msg, user, error } = await auth.signup({ ...data, displayName });

    if (!error) {
      snackbar.showSuccess(
        `Welcome and have fun ${user.displayName}`,
        'Close',
        () => {}
      );
      setRedirect(true);
    } else {
      snackbar.showError(msg, 'Close', () => {});
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
          Sign up
        </Typography>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(formSubmitHandler)}
            className={classes.form}
          >
            <SingUpForm />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disabled={isLoading}
            >
              Sign Up
            </Button>
            <Grid container justify='flex-end'>
              <Grid item>
                <RouterLink to='/sign-in' style={{ textDecoration: 'none' }}>
                  <Typography variant='body1' color='primary'>
                    Already have an account? Sign in
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
