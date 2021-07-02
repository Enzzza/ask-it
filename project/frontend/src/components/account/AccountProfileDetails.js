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

const AccountProfileDetails = (props) => {
  const auth = useAuth();

  const schema = yup.object().shape({
    email: yup.string().email('Email is invalid'),
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
            <Button color='primary' variant='contained' type='submit'>
              Save details
            </Button>
          </Box>
        </form>
      </Card>
    </FormProvider>
  );
};

export default AccountProfileDetails;
