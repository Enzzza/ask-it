import { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import AccountPasswordForm from '../forms/AccountPasswordForm';
import useCustomSnackbar from '../utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../../contexts/SpinnerContext';
import { useAuth } from '../../contexts/AuthContext';

const AccountPassword = () => {
  const auth = useAuth();
  const schema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('New password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const methods = useForm({ resolver: yupResolver(schema) });
  const { isLoading, setLoaderState } = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar();
  // console.log('errors', methods.errors);
  const formSubmitHandler = async (data) => {
    setLoaderState(true);
    let { msg, error } = await auth.updatePassword(data);
    if (!error) {
      snackbar.showSuccess(`Password updated!`, 'Close', () => {});
    } else {
      snackbar.showError(msg, 'Close', () => {});
    }
    setLoaderState(false);
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader subheader='Update password' title='Password' />
        <Divider />
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <CardContent>
            <AccountPasswordForm />
          </CardContent>
          <Divider />
          <Box display='flex' m={2} justifyContent='flex-end'>
            <Button color='primary' variant='contained' type='submit' disabled={isLoading}>
              Update
            </Button>
          </Box>
        </form>
      </Card>
    </FormProvider>
  );
};

export default AccountPassword;
