import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AskForm from '../components/forms/AskForm';
import { useMutation, useQueryClient } from 'react-query';
import { postController } from '../api/post';

import useCustomSnackbar from '../components/utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../contexts/SpinnerContext';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 50,
    width: '100%',
    maxWidth: 500,
  },
}));

export default function NewQuestion() {
  let history = useHistory();
  const queryClient = useQueryClient();
  const classes = useStyles();
  const schema = yup.object().shape({
    title: yup
      .string()
      .min(15, 'Title must be at least 15 characters.')
      .max(155, 'Title cannot be longer than 155 characters.')
      .required('Title is required.'),
    body: yup
      .string()
      .min(30, 'Body must be at least 30 characters.')
      .max(30000, 'Body cannot be longer than 30000 characters.')
      .required('Body is required.'),
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const { isLoading, setLoaderState } = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar();

  const mutation = useMutation((data) => postController.createPost(data), {
    onMutate: () => {
      setLoaderState(true);
    },

    onSuccess: (post) => {
      queryClient.invalidateQueries('questions');
      queryClient.invalidateQueries('users');
      snackbar.showSuccess(`Post added!`, 'Close', () => {});
      history.push(`/answers/${post.id}`);
    },

    onError: (error) => {
      snackbar.showError(error.message, 'Close', () => {});
    },
    onSettled: () => {
      setLoaderState(false);
    },
  });

  const formSubmitHandler = (data) => {
    mutation.mutate(data);
    methods.reset({ title: '', body: '' });
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
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  disabled={isLoading}
                >
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
