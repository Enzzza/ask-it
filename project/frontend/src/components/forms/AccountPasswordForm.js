import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function AccountPasswordForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword((p) => !p);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword((p) => !p);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((p) => !p);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Controller
        name='currentPassword'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextField
            {...field}
            style={{ marginTop: 10 }}
            variant='outlined'
            fullWidth
            id='currentPassword'
            label='Current Password'
            autoComplete='current-password'
            error={!!errors.currentPassword}
            helperText={
              errors.currentPassword ? errors.currentPassword?.message : ''
            }
            type={showCurrentPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowCurrentPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        name='newPassword'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextField
            {...field}
            style={{ marginTop: 10 }}
            variant='outlined'
            fullWidth
            id='newPassword'
            label='New Password'
            autoComplete='new-password'
            error={!!errors.newPassword}
            helperText={errors.newPassword ? errors.newPassword?.message : ''}
            type={showNewPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <Controller
        name='confirmPassword'
        control={control}
        defaultValue=''
        render={({ field }) => (
          <TextField
            {...field}
            style={{ marginTop: 10 }}
            variant='outlined'
            fullWidth
            id='confirmPassword'
            label='Confirm Password'
            autoComplete='new-password'
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword ? errors.confirmPassword?.message : ''
            }
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
