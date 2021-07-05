import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import { useParams } from 'react-router-dom';
import { userController } from '../api/user';
import { publicController } from '../api/public';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Profile() {
  let { id } = useParams();
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(0);
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    (async () => {
      setLoader(true);
      let {
        msg: userMsg,
        error: userError,
        user: fetchedUser,
      } = await userController.getUserById(id);
      let {
        msg: questionsMsg,
        error: questionsError,
        count,
      } = await publicController.GetPublicQuestionsById(id);
      if (userError || questionsError) {
        setError(true);
        if (userError) {
          setErrors([...errors, userMsg]);
        } else if (questionsError) {
          setErrors([...errors, questionsMsg]);
        }
      } else {
        setLoader(false);

        setUser(fetchedUser);
        setQuestions(count);
      }
    })();

    return () => {};
  }, [id]);

  if (!error) {
    return (
      <>
        <Container style={{ marginTop: 50 }}>
          <AccountProfile user={user} questions={questions} loading={loading} />
        </Container>
      </>
    );
  } else {
    return (
      <Box style={{marginTop:40, marginLeft:30, marginRight: 50}}>
        <div className={classes.root}>
          {errors.map((err) => (
            <Alert severity='error'>{err}</Alert>
          ))}
        </div>
      </Box>
    );
  }
}
