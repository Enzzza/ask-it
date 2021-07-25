import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useFormContext, Controller } from 'react-hook-form';

export default function EditQuestionForm(props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box padding={2}>
      <Box display='flex' flexDirection='column' padding={2}>
        <Controller
          name='questionTitle'
          control={control}
          defaultValue={props.title}
          render={({ field }) => (
            <TextField
              {...field}
              variant='outlined'
              id='questionTitle'
              label='Title'
              error={!!errors.questionTitle}
              helperText={
                errors.questionTitle ? errors.questionTitle?.message : ''
              }
            />
          )}
        />
      </Box>

      <Box padding={2} paddingBottom={0} marginTop={2}>
        <Controller
          name='questionBody'
          control={control}
          defaultValue={props.body}
          render={({ field }) => (
            <TextField
              {...field}
              variant='outlined'
              multiline
              rows={5}
              fullWidth
              label='Body'
              id='questionBody'
              error={!!errors.questionBody}
              helperText={
                errors.questionBody ? errors.questionBody?.message : ''
              }
            />
          )}
        />
      </Box>
    </Box>
  );
}
