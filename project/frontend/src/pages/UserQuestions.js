import React from 'react';
import UserQuestionsContainer from '../components/UserQuestions/UserQuestionsContainer';
import { useParams } from 'react-router-dom';

export default function UserQuestions() {
  let { userId } = useParams();
  return (
    <div>
      <UserQuestionsContainer userId={userId} />
    </div>
  );
}
