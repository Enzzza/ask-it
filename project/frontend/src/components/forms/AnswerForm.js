import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useFormContext, Controller } from 'react-hook-form';

export default function AnswerForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name='answer'
      control={control}
      defaultValue=''
      render={({ field }) => (
        <TextField
          {...field}
          variant='outlined'
          placeholder='Your answer'
          multiline
          rows={5}
          fullWidth
          label='Your answer'
          error={!!errors.answer}
          helperText={errors.answer ? errors.answer?.message : ''}
          id='answer'
        />
      )}
    />
  );
}
