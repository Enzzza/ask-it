import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { teal } from '@material-ui/core/colors';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: 50,
    marginBottom: 50,
    width: '100%',
  },
  title: {
    lineHeight: 1.3,
    fontWeight: 400,
    color: teal[700],
    fontSize: 24,
    marginLeft: 30,
    marginBottom: 20,
  },
});

export default function AnswerDivider() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.title}>Answers</Box>
      <Divider />
    </Box>
  );
}
