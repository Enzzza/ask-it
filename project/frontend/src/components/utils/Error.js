import React from 'react';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Error(props) {
  const classes = useStyles();
  return (
    <Box style={{ marginTop: 40, marginLeft: 30, marginRight: 50 }}>
      <div className={classes.root}>
        <Alert severity='error'>{props.message}</Alert>
      </div>
    </Box>
  );
}
