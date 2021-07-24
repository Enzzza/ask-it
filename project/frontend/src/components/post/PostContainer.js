import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import BaseCard from './BaseCard';
import AnswerDivider from '../answers/AnswerDivider';
import ActionButtons from './ActionButtons';
import Scroll from 'react-scroll';
const addMoreProps = (component, item) => {
  return React.cloneElement(component, {
    id: item.id,
    votes: item.score,
    answers: item.answerCount,
    views: item.viewCount,
    userId: item.userID,
  });
};

export default function PostContainer(props) {
  const scroll = Scroll.animateScroll;
  useEffect(() => {
    if (props.answerId) {
      scroll.scrollToBottom({ duration: 1500, delay: 100, smooth: true });
    }
  }, [props.answerId, scroll]);
  return (
    <>
      <Grid container spacing={3}>
        {props.questions.map((question, index) => (
          <React.Fragment key={question.id}>
            <Grid item xs={12}>
              <BaseCard
                sideComponent={addMoreProps(props.sideComponent, question)}
                question={question}
                isAnswer={props.isAnswer}
                actionComponent={
                  <ActionButtons
                    userId={question.userID}
                    postId={question.id}
                    post={question}
                  />
                }
              />
            </Grid>
            {index === 0 && props.isAnswer && <AnswerDivider />}
          </React.Fragment>
        ))}
      </Grid>
    </>
  );
}
