import React from 'react';
import AccountProfile from '../components/account/AccountProfile';
import { useParams } from 'react-router-dom';
import { userController } from '../api/user';
import { publicController } from '../api/public';
import Container from '@material-ui/core/Container';
import { useQuery } from 'react-query';
import Error from '../components/utils/Error';
import LoadingSpinner from '../components/utils/LoadingSpinner';

export default function Profile() {
  let { id } = useParams();
  const {
    data: user,
    isError: isUserError,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery(['users', id], () => userController.getUserById(id));

  const userId = user?.id;

  const {
    isLoading,
    isError,
    error,
    data: questions,
  } = useQuery(
    ['questions', { userId: id }],
    () => publicController.getPublicQuestionsById(id),
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
      <Container style={{ marginTop: 50 }}>
        <AccountProfile user={user} questions={questions.length} />
      </Container>
    </>
  );
}
