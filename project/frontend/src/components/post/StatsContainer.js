import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
const useStyles = makeStyles({
  statsCount: {
    fontSize: 17,
    color: grey[200],
  },
  statsText: {
    fontSize: 11,
    color: grey[200],
  },
});
export default function StatsContainer() {
  const classes = useStyles();
  return (
    <Box display='flex' flexDirection='column' marginLeft={1} marginRight={2}>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginBottom='8px'
      >
        <Box component='span' className={classes.statsCount}>
          0
        </Box>
        <Box component='span' className={classes.statsText}>
          votes
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        paddingTop='7px'
        paddingBottom='5px'
        marginBottom='8px'
      >
        <Box component='span' className={classes.statsCount}>
          0
        </Box>
        <Box component='span' className={classes.statsText}>
          answers
        </Box>
      </Box>

      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        paddingTop='4px'
      >
        <Box component='span' className={classes.statsText}>
          3 views
        </Box>
      </Box>
    </Box>
  );
}
