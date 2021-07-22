import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PostContainer from '../post/PostContainer';
import StatsContainer from '../post/StatsContainer';
import Pagination from '@material-ui/lab/Pagination';
import { useQuery, useQueryClient } from 'react-query';
import { userController } from '../../api/user';
import { grey } from '@material-ui/core/colors';
import Error from '../utils/Error';
import LoadingSpinner from '../utils/LoadingSpinner';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
  },
  pagination: {
    marginTop: 50,
    marginBottom: 50,
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    fontSize: 20,
    color: grey[300],
  },
}));

export default function UserQuestionsContainer(props) {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { isLoading, isError, error, data } = useQuery(
    ['questions', page, { userId: props.userId }],
    () => userController.getPaginatedUserQuestions(props.userId, page),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  useEffect(() => {
    if (data?.next) {
      queryClient.prefetchQuery(
        ['questions', page + 1, { userId: props.userId }],
        () => userController.getPaginatedUserQuestions(props.userId, page + 1)
      );
    }
  }, [data, page, queryClient, props.userId]);

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <div className={classes.root}>
      {data.total > 0 ? (
        <Box>
          <Grid container justify='center'>
            <Grid item xs={6}>
              <PostContainer
                sideComponent={<StatsContainer />}
                questions={data.questions}
                isAnswer={false}
              />
            </Grid>
          </Grid>
          <Grid container justify='center'>
            <Grid container justify='center' className={classes.pagination}>
              <Pagination
                count={Math.ceil(data.total / 20)}
                color='primary'
                page={page}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box className={classes.empty}>Question list empty!</Box>
      )}
    </div>
  );
}
