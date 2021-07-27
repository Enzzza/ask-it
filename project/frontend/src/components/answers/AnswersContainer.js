import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import VotingContainer from '../post/VotingContainer';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AnswerForm from '../forms/AnswerForm';

import useCustomSnackbar from '../utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../../contexts/SpinnerContext';
import Error from '../utils/Error';
import LoadingSpinner from '../utils/LoadingSpinner';

import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from 'react-query';
import { postController } from '../../api/post';
import { publicController } from '../../api/public';
import config from '../../api/config.json';

import { useAuth } from '../../contexts/AuthContext';
import { useHistory, useLocation } from 'react-router-dom';
import BaseCard from '../post/BaseCard';
import ActionButtons from '../post/ActionButtons';
import AnswerDivider from './AnswerDivider';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50,
  },
}));

export default function AnswersContainer(props) {
  const auth = useAuth();

  const history = useHistory();
  const location = useLocation();
  const queryClient = useQueryClient();
  const classes = useStyles();
  const schema = yup.object().shape({
    answer: yup
      .string()
      .min(30, 'Answer must be at least 30 characters.')
      .max(30000, 'Answer cannot be longer than 30000 characters.')
      .required('Answer is required.'),
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const { isLoading, setLoaderState } = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar();

  const signin = () => {
    const to = {
      pathname: '/sign-in',
      state: { from: location.pathname },
    };

    history.push(to);
  };

  const mutation = useMutation((data) => postController.createPost(data), {
    onMutate: () => {
      setLoaderState(true);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('questions');
      queryClient.invalidateQueries('users');
      snackbar.showSuccess(`Post added!`, 'Close', () => {});
    },

    onError: (error) => {
      snackbar.showError(error.message, 'Close', () => {});
    },
    onSettled: () => {
      setLoaderState(false);
    },
  });

  const formSubmitHandler = (data) => {
    if (auth.user) {
      mutation.mutate({
        parentId: parseInt(props.questionId),
        body: data.answer,
      });
      methods.reset({ answer: '' });
    }
  };

  const {
    isLoading: isQuestionLoading,
    isError: isQuestionError,
    data: question,
    error: questionError,
  } = useQuery(['questions', { questionId: props.questionId }], () =>
    postController.getQuestionPost(props.questionId)
  );

  const questionId = question?.id;

  const fetchAnswers = ({
    pageParam = `${config.BASE_URL}/api/v1/public/answers/${
      props.questionId
    }/${1}-${5}`,
  }) => {
    return publicController.getPaginatedAnswersForQuestion(pageParam);
  };

  const {
    isLoading: isAnswersLoading,
    data: questions,
    error: answersError,
    isError: isAnswersError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['questions', 'answers', { questionId: props.questionId }],
    fetchAnswers,
    {
      getPreviousPageParam: (firstPage) => firstPage.prev ?? false,
      getNextPageParam: (lastPage) => lastPage.next ?? false,
      enabled: !!questionId,
    }
  );

  const loadMoreButtonRef = React.useRef();

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (isQuestionLoading) {
    return <LoadingSpinner isLoading={isQuestionLoading} />;
  }

  if (isQuestionError) {
    return <Error message={questionError.message} />;
  }

  if (isAnswersLoading) {
    return <LoadingSpinner isLoading={isAnswersLoading} />;
  }

  if (isAnswersError) {
    return <Error message={answersError.message} />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BaseCard
                  sideComponent={
                    <VotingContainer
                      isAuth={!!auth.user}
                      user={auth.user ? auth.user : null}
                      id={question.id}
                      votes={question.score}
                      questionId={props.questionId}
                      isAnswer={false}
                    />
                  }
                  question={question}
                  isAnswer={false}
                  actionComponent={
                    <ActionButtons
                      userId={question.userID}
                      postId={question.id}
                      post={question}
                    />
                  }
                />
              </Grid>
              <AnswerDivider />
              {questions.pages.map((page,pageIndex) => (
                <React.Fragment key={page.next}>
                  {page.answers.map((item,answerIndex) => (
                    <Grid item xs={12} key={item.id}>
                      <BaseCard
                        sideComponent={
                          <VotingContainer
                            isAuth={!!auth.user}
                            user={auth.user ? auth.user : null}
                            id={item.id}
                            votes={item.score}
                            questionId={props.questionId}
                            isAnswer={true}
                            pageIndex={pageIndex}
                            answerIndex={answerIndex}
                          />
                        }
                        question={item}
                        isAnswer={true}
                        actionComponent={
                          <ActionButtons
                            userId={item.userID}
                            postId={item.id}
                            post={item}
                          />
                        }
                      />
                    </Grid>
                  ))}
                </React.Fragment>
              ))}
            </Grid>
          </>
        </Grid>
        <Grid container>
          <Box marginTop={2} marginLeft={2}>
            <Button
              ref={loadMoreButtonRef}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
            </Button>
          </Box>
        </Grid>
        <Grid container>
          <Box marginTop={10} width={'100%'}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
                <AnswerForm disabled={!auth.user} />
                <Box marginTop={5} marginBottom={5}>
                  <Box display='flex'>
                    <Box>
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={isLoading || !auth.user}
                      >
                        Post Your Answer
                      </Button>
                    </Box>
                    {!auth.user && (
                      <Box marginLeft={2}>
                        <Tooltip
                          title={<h3>You need to sign in to add answer!</h3>}
                          arrow
                        >
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={signin}
                          >
                            Login
                          </Button>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                </Box>
              </form>
            </FormProvider>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
