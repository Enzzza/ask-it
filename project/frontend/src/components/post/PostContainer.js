import React from 'react';
import Grid from '@material-ui/core/Grid';
import BaseCard from './BaseCard';
import StatsContainer from './StatsContainer';
export default function PostContainer() {
  return (
    <div>
      <Grid container spacing={3}>
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map( item => (
            <Grid item xs={12}>
                <BaseCard sideComponent={<StatsContainer/>}/>
            </Grid>
        ))}
      </Grid>
    </div>
  );
}
