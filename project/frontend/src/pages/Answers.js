import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AnswersContainer from '../components/answers/AnswersContainer';
import { useMutation, useQueryClient } from 'react-query';
import { viewController } from '../api/view';

export default function Answers() {
  let { questionId } = useParams();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (questionId) => viewController.addView(questionId),
    {
      retry: 1,
      onSuccess: () => {
        queryClient.invalidateQueries('questions');
      },
    }
  );

  useEffect(() => {
    mutation.mutate(parseInt(questionId));
  }, []);

  return <AnswersContainer questionId={questionId} />;
}
