import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue, grey, green, red } from '@material-ui/core/colors';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { useQuery } from 'react-query';
import { scoreController } from '../../api/score';
import Icon from '@material-ui/core/Icon';
import Error from '../utils/Error';
import { ClassicSpinner } from 'react-spinners-kit';

const useStyles = makeStyles({
  mainTitle: {
    color: grey[200],
    marginBottom: 20,
  },
  title: {
    lineHeight: 1.3,
    fontWeight: 400,
    color: lightBlue[500],
    fontSize: 20,
    textDecoration: 'none',
  },
  index: {
    fontSize: 20,
    color: grey[200],
    marginRight: 10,
  },
  box: {
    backgroundColor: green[400],
    color: grey[200],
    padding: '13px',
    borderRadius: '5px',
    marginRight: '10px',
    fontWeight: 500,
    fontSize: 20,
  },
});
const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};
export default function HotQuestions() {
  const classes = useStyles();
  const { isLoading, isError, data, error } = useQuery(
    ['questions', 'top'],
    () => scoreController.getTopScoreQuestions()
  );

  if (isLoading) {
    return <ClassicSpinner loading={isLoading} />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <div>
      <Box textAlign='center' className={classes.mainTitle}>
        <Typography variant='h5' gutterBottom>
          <Box display='flex' alignItems='center'>
            <Icon style={{ color: red[500] }}>local_fire_department</Icon>
            Hot Questions
            <Icon style={{ color: red[500] }}>local_fire_department</Icon>
          </Box>
        </Typography>
      </Box>

      {data.length ? (
        <Paper elevation={3}>
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <Box
                display='flex'
                padding={1}
                alignItems='center'
                justifyContent='space-between'
              >
                <Box display='flex' alignItems='baseline'>
                  <Box className={classes.index}>#{index + 1}</Box>
                  <RouterLink
                    className={classes.title}
                    to={`/answers/${item.id}`}
                  >
                    <Typography gutterBottom>
                      {truncate(item.title, 25)}
                    </Typography>
                  </RouterLink>
                </Box>

                <Box className={classes.box}>{item.score}</Box>
              </Box>
              {index + 1 !== data.length && <Divider />}
            </React.Fragment>
          ))}
        </Paper>
      ) : (
        <Box>There is no hot questions yet!</Box>
      )}
    </div>
  );
}
