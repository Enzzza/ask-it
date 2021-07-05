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
import AccountProfileDetailsForm from '../forms/AccountProfileDetailsForm';
import { useAuth } from '../../contexts/AuthContext';
import useCustomSnackbar from '../utils/snackbar/useCustomSnackbar';
import { SpinnerContext } from '../../contexts/SpinnerContext';

const AccountProfileDetails = (props) => {
  const auth = useAuth();
  const { isLoading, setLoaderState } = useContext(SpinnerContext);
  const snackbar = useCustomSnackbar();
  const schema = yup.object().shape({
    name: yup.string(),
    surname: yup.string(),
    email: yup.string().email('Email is invalid'),
  });

  const methods = useForm({ resolver: yupResolver(schema) });

  // console.log('errors', methods.errors);
  const formSubmitHandler = async (data) => {
    setLoaderState(true);
    let { msg, error } = await auth.updateDetails(data);
    if (!error) {
      snackbar.showSuccess(`Details updated!`, 'Close', () => {});
    } else {
      snackbar.showError(msg, 'Close', () => {});
    }
    setLoaderState(false);
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <form
          onSubmit={methods.handleSubmit(formSubmitHandler)}
          autoComplete='off'
          noValidate
        >
          <CardContent>
            <AccountProfileDetailsForm user={auth.user} />
          </CardContent>
          <Divider />
          <Box display='flex' m={2} justifyContent='flex-end'>
            <Button
              color='primary'
              variant='contained'
              type='submit'
              disabled={isLoading}
            >
              Save details
            </Button>
          </Box>
        </form>
      </Card>
    </FormProvider>
  );
};

export default AccountProfileDetails;
