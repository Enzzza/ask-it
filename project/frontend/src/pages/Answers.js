import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Scroll from 'react-scroll';
import AnswersContainer from '../components/answers/AnswersContainer';
import { useMutation, useQueryClient } from 'react-query';
import { viewController } from '../api/view';

export default function Answers() {
  // let scroll = Scroll.animateScroll;
  // scroll.scrollTo(100, {
  //   duration: 800,
  //   delay: 0,
  //   smooth: 'easeInOutQuart',
  //   activeClass: 'active',
  // });
  let { questionId, answerId } = useParams();
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

  return <AnswersContainer questionId={questionId} answerId={answerId} />;
}
