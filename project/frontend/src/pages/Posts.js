import React from 'react';
import { useParams } from 'react-router-dom';
import Scroll from 'react-scroll';

export default function Posts() {
  // let scroll = Scroll.animateScroll;
  // scroll.scrollTo(100, {
  //   duration: 800,
  //   delay: 0,
  //   smooth: 'easeInOutQuart',
  //   activeClass: 'active',
  // });
  let { id, answerId } = useParams();
  return (
    <div>
      Post with id:{id} and answerId: {answerId}
    </div>
  );
}
