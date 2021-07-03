import { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import AccountPassword from '../components/account/AccountPassword';
import { useAuth } from '../contexts/AuthContext';
import { userController } from '../api/user';

const Account = () => {
  const auth = useAuth();
  const [questions, setQuestions] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      let fetchedUser = await userController.getUserById(auth.user.id);
      let fetchedQuestions = (await userController.getUserQuestions()).length;
      setTimeout(() => {}, 500);
      setUser(fetchedUser);
      setQuestions(fetchedQuestions);
    })();

    return () => {};
  }, [auth.user.id]);
  return (
    <>
      <Box m={5}>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={user} questions={questions} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
          <Box m={10}>
            <AccountPassword />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Account;
