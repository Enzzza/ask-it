import React, { useState, useEffect } from 'react';
import PostContainer from '../post/PostContainer';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import StatsContainer from '../post/StatsContainer';
import SideContainer from './SideContainer';
import Pagination from '@material-ui/lab/Pagination';
import {useQuery, useQueryClient} from 'react-query';
import { publicController } from '../../api/public';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    marginLeft: 50,
  },
  pagination: {
    marginTop: 50,
    marginBottom: 50,
  },
}));

export default function HomeContainer(props) {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  
  const { isLoading, isError, data } = useQuery(['questions',page],() => publicController.getPaginatedPublicQuestions(page),{keepPreviousData: true})

  useEffect(() => {
    if(data?.next){
      queryClient.prefetchQuery(['questions',page+1],() => publicController.getPaginatedPublicQuestions(page+1))
    }
  },[data,page,queryClient])

  
  if(isLoading){
    return(
      <div>Loading...</div>
    )
  }

  if(isError){
    return <span>Error</span>
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={7}>
          <PostContainer sideComponent={<StatsContainer />} questions={data.questions} isAnswer={false}/>
        </Grid>
        <Grid item xs={5}>
          <SideContainer />
        </Grid>
        <Grid container justify='center' className={classes.pagination}>
          <Pagination
            count={Math.ceil(data.total/20)}
            color='primary'
            page={page}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </div>
  );
}