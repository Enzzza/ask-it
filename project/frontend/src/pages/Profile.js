import React from 'react';
import { makeStyles } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import { useParams } from 'react-router-dom';
import { userController } from '../api/user';
import { publicController } from '../api/public';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import { useQuery } from 'react-query';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Profile() {
  const classes = useStyles();
  let { id } = useParams();
  const { isError: isUserError, data: user } = useQuery(['users', id], () =>
    userController.getUserById(id)
  );

  const {
    isLoading,
    isError,
    data: questions,
  } = useQuery(['questions', { userId: id }], () =>
    publicController.getPublicQuestionsById(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isUserError) {
    return (
      <Box style={{ marginTop: 40, marginLeft: 30, marginRight: 50 }}>
        <div className={classes.root}>
          <Alert severity='error'>Server is down, please try again later!</Alert>
        </div>
      </Box>
    );
  }


  
    return (
      <>
        <Container style={{ marginTop: 50 }}>
          <AccountProfile user={user.user} questions={questions.count}/>
        </Container>
      </>
    );
  
}
