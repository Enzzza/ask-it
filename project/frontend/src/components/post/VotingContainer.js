import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { grey, green, red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import { userController } from '../../api/user';
import { scoreController } from '../../api/score';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import useCustomSnackbar from '../utils/snackbar/useCustomSnackbar';

const useStyles = makeStyles({
  statsCount: {
    fontSize: 17,
    color: grey[200],
  },
  statsText: {
    fontSize: 20,
    color: grey[200],
    userSelect: 'none',
  },
  thumbsUpBtn: {
    color: green[200],
  },

  thumbsDownBtn: {
    color: red[200],
  },
  thumbsUpBtnActive: {
    color: green[500],
  },

  thumbsDownBtnActive: {
    color: red[500],
  },

  thumbsUpBtnInactive: {
    color: grey[500],
  },

  thumbsDownBtnInactive: {
    color: grey[500],
  },
});

function setThumbsUpState(user, postId) {
  if (!user || !user.votes) {
    return null;
  } else {
    let posts = user.votes.posts;
    if (!posts.hasOwnProperty(postId)) {
      return null;
    } else {
      let vote = posts[postId].vote;
      if (vote === 1) {
        return true;
      } else {
        return false;
      }
    }
  }
}

function setThumbsDownState(user, postId) {
  if (!user || !user.votes) {
    return null;
  } else {
    let posts = user.votes.posts;
    if (!posts.hasOwnProperty(postId)) {
      return null;
    } else {
      let vote = posts[postId].vote;
      if (vote === -1) {
        return true;
      } else {
        return false;
      }
    }
  }
}

export default function VotingContainer(props) {
  const classes = useStyles();
  const snackbar = useCustomSnackbar();
  const queryClient = useQueryClient();

  let userId = props.isAuth ? props.user.id : 0;

  const { data: user } = useQuery(
    ['users', userId],
    () => userController.getUserById(userId),
    {
      retry: 1,
      enabled: Boolean(userId),
    }
  );

  const addScoreMutation = useMutation(
    (data) => scoreController.addScore(data),
    {
      onMutate: async (vote) => {
        await queryClient.cancelQueries(['users', userId]);
        const previousVote = queryClient.getQueryData(['users', userId]);
        let newVote = { ...previousVote };
        if(newVote.votes === null){
          newVote.votes = {}
        }
        !('posts' in newVote.votes) && (newVote.votes.posts={})
        newVote.votes.posts[vote.postID] = { id: vote.postID, vote: vote.vote };

        let previousPost = null;
        let newPost = null;
        if (props.isAnswer) {
          await queryClient.cancelQueries([
            'questions',
            'answers',
            { questionId: props.questionId.toString() },
          ]);

          previousPost = queryClient.getQueryData([
            'questions',
            'answers',
            { questionId: props.questionId.toString() },
          ]);
          newPost = { ...previousPost };
          newPost.pages[props.pageIndex].answers[props.answerIndex].score +=
            vote.vote;
        } else {
          await queryClient.cancelQueries([
            ['questions', { questionId: props.questionId.toString() }],
          ]);
          previousPost = queryClient.getQueryData([
            'questions',
            { questionId: props.questionId.toString() },
          ]);
          newPost = { ...previousPost };
          newPost.score += vote.vote;
        }

        return { previousVote, previousPost, newVote };
      },
      onSuccess: () => {
        snackbar.showSuccess(`Vote added`);
      },

      onError: (error, context) => {
        queryClient.setQueryData(
          ['users', context.newVote.id],
          context.previousVote
        );
        if (props.isAnswer) {
          queryClient.setQueryData(
            [
              'questions',
              'answers',
              { questionId: props.questionId.toString() },
            ],
            context.previousPost
          );
        } else {
          queryClient.setQueryData(
            ['questions', { questionId: props.questionId.toString() }],
            context.previousPost
          );
        }

        snackbar.showError(error.message, 'Close', () => {});
      },
      onSettled: (newVote) => {
        if (props.isAnswer) {
          queryClient.invalidateQueries([
            'questions',
            'answers',
            { questionId: props.questionId.toString() },
          ]);
        } else {
          queryClient.invalidateQueries([
            'questions',
            { questionId: props.questionId.toString() },
          ]);
        }

        queryClient.invalidateQueries(['users', newVote.id]);
      },
    }
  );

  const upVote = () => {
    addScoreMutation.mutate({ postID: props.id, vote: 1 });
  };

  const downVote = () => {
    addScoreMutation.mutate({ postID: props.id, vote: -1 });
  };

  return (
    <>
      {props.isAuth ? (
        <Box
          display='flex'
          flexDirection='column'
          marginLeft={1}
          marginRight={2}
          justifyContent='center'
        >
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            marginBottom='8px'
          >
            <Box component='span'>
              <IconButton
                aria-label='thumbs up'
                disabled={setThumbsUpState(user, props.id)}
                onClick={upVote}
              >
                <ThumbUp
                  className={
                    setThumbsUpState(user, props.id)
                      ? classes.thumbsUpBtnActive
                      : classes.thumbsUpBtn
                  }
                />
              </IconButton>
            </Box>
            <Box
              component='span'
              className={classes.statsText}
              marginTop='8px'
              marginBottom='8px'
            >
              {props.votes}
            </Box>
            <Box component='span'>
              <IconButton
                aria-label='thumbs down'
                disabled={setThumbsDownState(user, props.id)}
                onClick={downVote}
              >
                <ThumbDown
                  className={
                    setThumbsDownState(user, props.id)
                      ? classes.thumbsDownBtnActive
                      : classes.thumbsDownBtn
                  }
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          marginLeft={1}
          marginRight={2}
          justifyContent='center'
        >
          <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            marginBottom='8px'
          >
            <Box component='span'>
              <IconButton aria-label='thumbs up' disabled>
                <ThumbUp className={classes.thumbsUpBtnInactive} />
              </IconButton>
            </Box>
            <Box
              component='span'
              className={classes.statsText}
              marginTop='8px'
              marginBottom='8px'
            >
              {props.votes}
            </Box>
            <Box component='span'>
              <IconButton aria-label='thumbs down' disabled>
                <ThumbDown className={classes.thumbsDownBtnInactive} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
