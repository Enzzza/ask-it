import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';
export default function AccountProfileDetailsForm(props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Controller
            name='name'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                autoComplete='given-name'
                variant='outlined'
                fullWidth
                id='name'
                label='Name'
                autoFocus
                value={props.user.name}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name='surname'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                autoComplete='family-name'
                variant='outlined'
                fullWidth
                id='surname'
                label='Surname'
                value={props.user.surname}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                fullWidth
                id='email'
                label='Email Address'
                autoComplete='email'
                value={props.user.email}
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ''}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}
