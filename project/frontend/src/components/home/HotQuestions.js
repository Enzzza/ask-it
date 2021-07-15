import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue, grey, green } from '@material-ui/core/colors';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { useQuery } from 'react-query';
import { scoreController } from '../../api/score';
const useStyles = makeStyles({
  mainTitle: {
    color: grey[200],
  },
  title: {
    lineHeight: 1.3,
    fontWeight: 400,
    color: lightBlue[500],
    fontSize: 20,
    textDecoration: 'none',
  },
  box: {
    backgroundColor: green[400],
    color: grey[200],
    padding: '5px',
    borderRadius: '5px',
    marginRight: '10px',
  },
});
const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};
export default function HotQuestions() {
  const classes = useStyles();
  const { isLoading, isError, data, error } = useQuery(['top-questions'], () =>
    scoreController.getTopScoreQuestions()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Box textAlign='center' className={classes.mainTitle}>
        <Typography variant='h5' gutterBottom>
          Hot Questions
        </Typography>
      </Box>
      <Paper elevation={3}>
        {data.score.map((item,index) => (
          <>
            <Box display='flex' padding={1} alignItems='center'>
              <Box className={classes.box}>50</Box>
              <RouterLink className={classes.title}>
                <Typography gutterBottom>
                  {truncate(item.title,80)}
                </Typography>
              </RouterLink>
            </Box>
            {index!==data.score.length && <Divider />}
            
          </>
        ))}
      </Paper>
    </div>
  );
}
