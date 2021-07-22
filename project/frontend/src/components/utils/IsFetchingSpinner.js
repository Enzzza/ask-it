import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImpulseSpinner } from 'react-spinners-kit';
import { useIsFetching } from 'react-query';
const useStyles = makeStyles((theme) => ({
  spinner: {
    position: 'fixed',
    zIndex: 1337,
    top: '95%',
    left: '90%',
  
  },
}));

export default function IsFetchingSpinner() {
  const classes = useStyles();
  const isFetching = useIsFetching();
  return (
    <div className={classes.spinner}>
      <ImpulseSpinner size={30} loading={!!isFetching} />
    </div>
  );
}
