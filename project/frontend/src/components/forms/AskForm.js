import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useFormContext, Controller } from 'react-hook-form';
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 16,
    fontWeight: 800,
    color: grey[300],
  },
  subtitle: {
    fontSize: 12,
    color: grey[500],
  },
}));

export default function AskForm() {
  const classes = useStyles();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box padding={2}>
      <Box display='flex' flexDirection='column'>
        <Box className={classes.title}>Title</Box>
        <Box className={classes.subtitle} marginBottom={2}>
          Be specific and imagine you’re asking a question to another person
        </Box>
        <Controller
          name='title'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              variant='outlined'
              placeholder='e.g. How to efficiently concatenate strings in Go?'
              id='title'
              error={!!errors.title}
              helperText={errors.title ? errors.title?.message : ''}
            />
          )}
        />
      </Box>
      <Box display='flex' flexDirection='column'>
        <Box className={classes.title} marginTop={2}>
          Body
        </Box>
        <Box className={classes.subtitle} marginBottom={2}>
          Include all the information someone would need to answer your question
        </Box>
        <Controller
          name='body'
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              {...field}
              variant='outlined'
              multiline
              rows={5}
              fullWidth
              label='Body'
              id='body'
              error={!!errors.body}
              helperText={errors.body ? errors.body?.message : ''}
            />
          )}
        />
      </Box>
    </Box>
  );
}
