import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import  Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AskForm from '../components/forms/AskForm';

import useCustomSnackbar from '../components/utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../contexts/SpinnerContext';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 50,
    width: '100%',
    maxWidth: 500,
  },
}));

export default function NewQuestion() {
  const classes = useStyles();
  const schema = yup.object().shape({
    title: yup.string().max(155,'Title must be less than or equal to 155 characters').required('Title is required'),
    body: yup.string().max(30000,'Body must be less than or equal to 30000 characters').required('Body is required'),
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const { isLoading, setLoaderState } = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar();
  const formSubmitHandler = (data) => {
    //setLoaderState(true);
    //snackbar.showSuccess(`Welcome ${user.displayName}`, 'Close', () => {});
    //setLoaderState(false);
    console.log('form submited', data);
    methods.reset({ title: '', body: '' });
    // redirect to new post
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      marginTop={10}
    >
      <Box>
        <Typography variant='h5' gutterBottom>
          Ask a public question
        </Typography>
      </Box>
      <Box className={classes.form}>
        <Paper elevation={5}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
              <AskForm />
              <Box padding={2}>
                <Button variant='contained' color='primary' type='submit'>
                  Post your question
                </Button>
              </Box>
            </form>
          </FormProvider>
        </Paper>
      </Box>
    </Box>
  );
}
