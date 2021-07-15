import React from 'react';
import Box from '@material-ui/core/Box';
import HotQuestions from './HotQuestions';
import TopUserList from './TopUserList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin:50
    },
    gap: {
        marginBottom: 50
    }
  }));
  
export default function SideContainer() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box display='flex' flexDirection='column'>
        <Box className={classes.gap}>
          <HotQuestions />
        </Box>
        <Box>
          <TopUserList />
        </Box>
      </Box>
    </div>
  );
}
