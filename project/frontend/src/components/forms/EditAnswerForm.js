import React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { useFormContext, Controller } from 'react-hook-form';

export default function EditAnswerForm(props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Box padding={2}>
      <Box padding={2} paddingBottom={0} marginTop={2}>
        <Controller
          name='answerBody'
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
              id='answerBody'
              error={!!errors.answerBody}
              helperText={errors.answerBody ? errors.answerBody?.message : ''}
            />
          )}
        />
      </Box>
    </Box>
  );
}
