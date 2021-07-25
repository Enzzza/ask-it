import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import { SpinnerContext } from '../../contexts/SpinnerContext';

const useStyles = makeStyles((theme) => ({
  spinner: {
    position: 'fixed',
    zIndex: 1337,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export const Spinner = (props) => {
  const { isLoading } = useContext(SpinnerContext);
  const classes = useStyles();

  return (
    <div className={classes.spinner}>
      <RotateSpinner size={45} color='#005A34' loading={isLoading} />
    </div>
  );
};
