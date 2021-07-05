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
            defaultValue={props.user.name}
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete='given-name'
                variant='outlined'
                fullWidth
                id='name'
                label='Name'
                autoFocus
                error={!!errors.name}
                helperText={errors.name ? errors.name?.message : ''}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name='surname'
            control={control}
            defaultValue={props.user.surname}
            render={({ field }) => (
              <TextField
                {...field}
                autoComplete='family-name'
                variant='outlined'
                fullWidth
                id='surname'
                label='Surname'
                error={!!errors.surname}
                helperText={errors.surname ? errors.surname?.message : ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name='email'
            control={control}
            defaultValue={props.user.email}
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                fullWidth
                id='email'
                label='Email Address'
                autoComplete='email'
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
