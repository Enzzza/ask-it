import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { red, blue } from '@material-ui/core/colors';

import useCustomSnackbar from '../utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../../contexts/SpinnerContext';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation, useQueryClient } from 'react-query';
import { postController } from '../../api/post';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  editBtn: {
    color: blue[500],
  },
  deleteBtn: {
    color: red[500],
  },
});

export default function ActionButtons(props) {
  const history = useHistory();
  const classes = useStyles();
  const snackbar = useCustomSnackbar();
  const { setLoaderState } = useContext(SpinnerContext);
  const auth = useAuth();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(
    (postId) => postController.deletePost(postId),
    {
      onMutate: () => {
        setLoaderState(true);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries('questions');
        queryClient.invalidateQueries('users');
        snackbar.showSuccess(`Post deleted!`, 'Close', () => {});
        if (data.parentId === 0) {
          history.push('/');
        }
      },

      onError: (error) => {
        snackbar.showError(error.message, 'Close', () => {});
      },
      onSettled: () => {
        setLoaderState(false);
      },
    }
  );

  const deletePost = () => {
    if (!props.post.answerCount) {
      deleteMutation.mutate(parseInt(props.postId));
    } else {
      snackbar.showError(
        'Sorry, this questions has answers and cannot be deleted!',
        'Close',
        () => {}
      );
    }
  };

  const editPost = () => {
    history.push(`/edit/${props.postId}`);
  };

  return (
    <Box display='flex' justifyContent='flex-end' marginTop={1}>
      {auth.user.id === props.userId && (
        <>
          <Box>
            <IconButton aria-label='edit' onClick={editPost}>
              <EditIcon className={classes.editBtn} />
            </IconButton>
          </Box>
          <Box>
            <IconButton aria-label='delete' onClick={deletePost}>
              <DeleteIcon className={classes.deleteBtn} />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
}
