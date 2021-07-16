import React from 'react';
import Grid from '@material-ui/core/Grid';
import BaseCard from './BaseCard';
import AnswerDivider from '../answers/AnswerDivider';

const addMoreProps = (component, item) => {
  return React.cloneElement(component, {
    id: item.id,
    votes: item.score,
    answers: item.answerCount,
    views: item.viewCount,
  });
};

export default function PostContainer(props) {
  return (
    <div>
      <Grid container spacing={3}>
        {props.questions.map((question, index) => (
          <>
            <Grid item xs={12} key={question.id}>
              <BaseCard
                sideComponent={addMoreProps(props.sideComponent, question)}
                question={question}
                isAnswer={props.isAnswer}
              />
            </Grid>
            {index === 0 && props.isAnswer && <AnswerDivider />}
          </>
        ))}
      </Grid>
    </div>
  );
}
