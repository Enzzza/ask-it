import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { grey, green, red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';


const useStyles = makeStyles({
  statsCount: {
    fontSize: 17,
    color: grey[200],
  },
  statsText: {
    fontSize: 20,
    color: grey[200],
    userSelect: 'none',
  },
  thumbsUpBtn: {
    color: green[300],
  },

  thumbsDownBtn: {
    color: red[300],
  },
  thumbsUpBtnActive: {
    color: green[500],
  },

  thumbsDownBtnActive: {
    color: red[500],
  },
});
export default function VotingContainer(props) {
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
          <IconButton disabled aria-label="thumbs up">
            <ThumbUp className={classes.thumbsUpBtn} />
          </IconButton>
        </Box>
        <Box
          component='span'
          className={classes.statsText}
          marginTop='8px'
          marginBottom='8px'
        >
          {props.votes}
        </Box>
        <Box component='span'>
          <IconButton aria-label="thumbs down">
            <ThumbDown className={classes.thumbsDownBtn} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
