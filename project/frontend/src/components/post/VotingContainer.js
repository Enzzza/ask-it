import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles({
  statsCount: {
    fontSize: 17,
    color: grey[200],
  },
  statsText: {
    fontSize: 20,
    color: grey[200],
  },
});
export default function VotingContainer() {
  const classes = useStyles();
  return (
    <Box
      display='flex'
      flexDirection='column'
      marginLeft={1}
      marginRight={2}
      justifyContent='center'
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginBottom='8px'
      >
        <Box component='span'>
          <KeyboardArrowUp />
        </Box>
        <Box component='span' className={classes.statsText} marginTop="8px" marginBottom="8px">
          0
        </Box>
        <Box component='span'>
          <KeyboardArrowDown />
        </Box>
      </Box>
    </Box>
  );
}
