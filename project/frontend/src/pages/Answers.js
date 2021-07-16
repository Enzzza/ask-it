import React from 'react';
import { useParams } from 'react-router-dom';
import Scroll from 'react-scroll';
import AnswersContainer from '../components/answers/AnswersContainer';

export default function Answers() {
  // let scroll = Scroll.animateScroll;
  // scroll.scrollTo(100, {
  //   duration: 800,
  //   delay: 0,
  //   smooth: 'easeInOutQuart',
  //   activeClass: 'active',
  // });
  let { questionId, answerId } = useParams();
  return (
    <AnswersContainer questionId={questionId} answerId={answerId}/>
  );
}
