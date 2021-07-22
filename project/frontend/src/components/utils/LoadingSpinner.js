import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PushSpinner } from 'react-spinners-kit';

const useStyles = makeStyles((theme) => ({
  spinner: {
    position: 'fixed',
    zIndex: 1337,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default function LoadingSpinner(props) {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <PushSpinner size={30} color='#005A34' loading={props.isLoading} />
    </div>
  );
}
