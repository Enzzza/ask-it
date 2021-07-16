import React, { useContext } from 'react';
import PostContainer from '../post/PostContainer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import VotingContainer from '../post/VotingContainer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AnswerForm from '../forms/AnswerForm';

import useCustomSnackbar from '../utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../../contexts/SpinnerContext';
import { useQuery } from 'react-query';
import { postController } from '../../api/post';
import { publicController } from '../../api/public';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
  },
}));

export default function AnswersContainer(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    answer: yup.string().required('Answer is required'),
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const { isLoading, setLoaderState } = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar();

  const formSubmitHandler = (data) => {
    //setLoaderState(true);
    //snackbar.showSuccess(`Welcome ${user.displayName}`, 'Close', () => {});
    //setLoaderState(false);
    console.log('form submited', data);
    methods.reset({ answer: '' });
  };

  const {
    isLoading: isQuestionLoading,
    isError,
    data,
  } = useQuery(['questions', { id: props.questionId }], () =>
    postController.getQuestionPost(props.questionId)
  );

  const questionId = data?.post.id;

  const {
    isIdle,
    isLoading: isAnswersLoading,
    isError: isAnswersError,
    data: questions,
  } = useQuery(
    ['answers', { id: props.questionId }],
    () => publicController.getAnswersForQuestion(props.questionId),
    {
      enabled: !!questionId,
    }
  );

  if (isQuestionLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading question</div>;
  }

  if (isIdle) {
    return <div>Loading...</div>;
  }

  if (isAnswersLoading) {
    return <div>Loading...</div>;
  }

  if (isAnswersError) {
    return <div>Error loading answers</div>;
  }

  // Get post by props.questionID than get answers for that question (use GetPost from Postcontroller and GetAnswersForQuestion from public controller)
  // pass questions to post Container add question card to top with costum styling
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <PostContainer
            sideComponent={<VotingContainer />}
            isAnswer={true}
            questions={[data.post, ...questions.answers]}
          />
        </Grid>
        <Grid container>
          <Box marginTop={10} width={'100%'}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
                <AnswerForm />
                <Box marginTop={5} marginBottom={5}>
                  <Button variant='contained' color='primary' type='submit'>
                    Post Your Answer
                  </Button>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
