import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { RotateSpinner  } from 'react-spinners-kit';
import { SpinnerContext } from '../../contexts/SpinnerContext';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  spinner: {
    position: 'fixed',
    zIndex: 1031,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    
  },
  color: deepPurple[500],
}));

export const Spinner = (props) => {
  const { isLoading } = useContext(SpinnerContext);
  const classes = useStyles();

  return (
    <div className={classes.spinner}>
      {' '}
      <RotateSpinner  size={45} color="#005A34" loading={isLoading} />
    </div>
  );
};
