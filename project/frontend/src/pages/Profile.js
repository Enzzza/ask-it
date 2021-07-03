import React, { useState, useEffect } from 'react';
import AccountProfile from '../components/account/AccountProfile';
import { useParams } from 'react-router-dom';
import { userController } from '../api/user';
import { publicController } from '../api/public';
import Container from '@material-ui/core/Container';


export default function Profile() {
  let { id } = useParams();
  const [user, setUser] = useState(null);
  const [questions,setQuestions] = useState(0)
  const [loading, setLoader] = useState(false);
  
  
  useEffect(() => {
    (async () => {
      setLoader(true);
      let fetchedUser = await userController.getUserById(id);
      let fetchedQuestions = (await publicController.GetPublicQuestionsById(id)).length;
      setTimeout(() => {
        setLoader(false);
      }, 500);
      setUser(fetchedUser);
      setQuestions(fetchedQuestions);
    })();

    return () => {};
  }, [id]);

  return (
    <>
      <Container style={{marginTop:50}}>
        <AccountProfile user={user} questions={questions} loading={loading} />
      </Container>
    </>
  );
}
