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

const AccountPassword = () => {
  const schema = yup.object().shape({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const methods = useForm({ resolver: yupResolver(schema) });

  // console.log('errors', methods.errors);
  const formSubmitHandler = (data) => {
    console.log('form');
    console.log('Form data is ', data);
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
            <Button color='primary' variant='contained' type='submit'>
              Update
            </Button>
          </Box>
        </form>
      </Card>
    </FormProvider>
  );
};

export default AccountPassword;
