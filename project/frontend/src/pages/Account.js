import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import AccountPassword from '../components/account/AccountPassword';
import { useAuth } from '../contexts/AuthContext';
import { userController } from '../api/user';
import { useQuery } from 'react-query';
import Error from '../components/utils/Error';
import LoadingSpinner from '../components/utils/LoadingSpinner';

const Account = () => {
  const auth = useAuth();
  const {
    data: user,
    isError: isUserError,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery(['users', auth.user.id], () =>
    userController.getUserById(auth.user.id)
  );

  const userId = user?.id;

  const {
    isLoading,
    isError,
    error,
    data: questions,
  } = useQuery(
    ['questions', { userId: auth.user.id }],
    () => userController.getUserQuestions(auth.user.id),
    {
      enabled: !!userId,
    }
  );

  if (isUserLoading) {
    return <LoadingSpinner isLoading={isUserLoading} />;
  }

  if (isUserError) {
    return <Error message={userError.message} />;
  }

  if (isLoading) {
    return <LoadingSpinner isLoading={isLoading} />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <>
      <Box m={5}>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile user={user} questions={questions.length} />
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
