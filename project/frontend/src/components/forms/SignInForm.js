import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function SignUpForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((p) => !p);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Grid container spacing={2}>
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
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ''}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name='password'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                {...field}
                variant='outlined'
                fullWidth
                id='password'
                label='Password'
                autoComplete='current-password'
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ''}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}
