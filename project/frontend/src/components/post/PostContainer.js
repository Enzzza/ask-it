import React from 'react';
import Grid from '@material-ui/core/Grid';
import BaseCard from './BaseCard';

const addMoreProps = (component, item) => {
  return React.cloneElement(component, {
    votes: item.score,
    answers: item.answerCount,
    views: item.viewCount,
  });
};

export default function PostContainer(props) {
  return (
    <div>
      <Grid container spacing={3}>
        {props.questions.map((question) => (
          <Grid item xs={12}>
            <BaseCard sideComponent={addMoreProps(props.sideComponent, question)} question={question} isAnswer={props.isAnswer}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
