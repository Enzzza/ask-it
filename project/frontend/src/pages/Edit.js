import React, { useContext, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { postController } from '../api/post';
import useCustomSnackbar from '../components/utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../contexts/SpinnerContext';
import Error from '../components/utils/Error';
import LoadingSpinner from '../components/utils/LoadingSpinner';
import EditQuestionForm from '../components/forms/EditQuestionForm';
import EditAnswerForm from '../components/forms/EditAnswerForm';

import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: 40,
    width: '100%',
    maxWidth: 500,
  },
  notAuth: {
    width: '100%',
    textAlign: 'center',
    fontSize: 34,
    fontWeight: 800,
    color: pink[800],
    marginTop: 20,
  },
}));

let questionShape = {
  questionTitle: yup
    .string()
    .min(15, 'Title must be at least 15 characters.')
    .max(155, 'Title cannot be longer than 155 characters.')
    .required('Title is required.'),
  questionBody: yup
    .string()
    .min(30, 'Body must be at least 30 characters.')
    .max(30000, 'Body cannot be longer than 30000 characters.')
    .required('Body is required.'),
};
let answerShape = {
  answerBody: yup
    .string()
    .min(30, 'Body must be at least 30 characters.')
    .max(30000, 'Body cannot be longer than 30000 characters.')
    .required('Body is required.'),
};
const questionSchema = yup.object().shape(questionShape);
const answerSchema = yup.object().shape(answerShape);

export default function Edit() {
  const auth = useAuth();
  let { postId } = useParams();
  const history = useHistory();
  const location = useLocation();
  const queryClient = useQueryClient();
  const classes = useStyles();

  const questionMethods = useForm({ resolver: yupResolver(questionSchema) });
  const answerMethods = useForm({ resolver: yupResolver(answerSchema) });
  const { isLoading, setLoaderState } = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar();

  const mutation = useMutation(
    (data) => postController.updatePost(data, postId),
    {
      onMutate: () => {
        setLoaderState(true);
      },

      onSuccess: (post) => {
        queryClient.invalidateQueries('questions');
        queryClient.invalidateQueries('users');
        snackbar.showSuccess(`Post updated!`, 'Close', () => {});
        history.push(`/answers/${post.id}`);
      },

      onError: (error) => {
        snackbar.showError(error.message, 'Close', () => {});
      },
      onSettled: () => {
        setLoaderState(false);
      },
    }
  );

  const questionFormSubmitHandler = (data) => {
    mutation.mutate(
      { title: data.questionTitle, body: data.questionBody },
      postId
    );
  };

  const answerFormSubmitHandler = (data) => {
    mutation.mutate({ body: data.answerBody }, postId);
  };

  const {
    isLoading: isLoadingPost,
    isError,
    data,
    error,
  } = useQuery(
    ['questions', { postId: postId }],
    () => postController.getPost(postId),
    {
      initialData: () => {
        let questions = [];
        let queries = queryClient.getQueryCache().findAll(['questions']);
        queries.forEach((q) => {
          let data = q.state.data;
          if (Array.isArray(data)) {
            questions.push(...data);
          } else if (
            typeof data === 'object' &&
            data !== null &&
            !Array.isArray(data)
          ) {
            if (data.hasOwnProperty('questions')) {
              questions.push(...data.questions);
            } else if (data.hasOwnProperty('id')) {
              questions.push(data);
            }
          }
        });
        return questions.find((q) => q.id === parseInt(postId));
      },
    }
  );

  if (isLoadingPost) {
    return <LoadingSpinner isLoading={isLoadingPost} />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <>
      {auth.user ? (
        <Box>
          {' '}
          {data.userID === auth.user.id ? (
            <Box
              display='flex'
              flexDirection='column'
              alignItems='center'
              marginTop={10}
            >
              <Box>
                <Typography variant='h5' gutterBottom>
                  Edit your post
                </Typography>
              </Box>
              <Box className={classes.form}>
                <Paper elevation={5}>
                  {!data.parentId ? (
                    <FormProvider {...questionMethods}>
                      <form
                        onSubmit={questionMethods.handleSubmit(
                          questionFormSubmitHandler
                        )}
                      >
                        <EditQuestionForm title={data.title} body={data.body} />
                        <Box padding={2}>
                          <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={isLoading}
                          >
                            Edit your post
                          </Button>
                        </Box>
                      </form>
                    </FormProvider>
                  ) : (
                    <FormProvider {...answerMethods}>
                      <form
                        onSubmit={answerMethods.handleSubmit(
                          answerFormSubmitHandler
                        )}
                      >
                        <EditAnswerForm body={data.body} />
                        <Box padding={2}>
                          <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={isLoading}
                          >
                            Edit your post
                          </Button>
                        </Box>
                      </form>
                    </FormProvider>
                  )}
                </Paper>
              </Box>
            </Box>
          ) : (
            <Box className={classes.notAuth}>
              You are not authorized to edit this post!
            </Box>
          )}
        </Box>
      ) : (
        <Box display='flex' flexDirection='column' alignItems='center'>
          <Box className={classes.notAuth}>You are not signed in!</Box>
          <Box marginTop={3}>
            <Button
              size='large'
              color='primary'
              variant='contained'
              onClick={() =>
                history.push({
                  pathname: '/sign-in',
                  state: { from: location.pathname },
                })
              }
            >
              Sign in to edit posts!
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}
