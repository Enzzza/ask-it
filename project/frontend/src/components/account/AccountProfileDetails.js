import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';

import { useAuth } from '../../contexts/AuthContext';
import { useForm } from '../../hooks/useForm';



const AccountProfileDetails = (props) => {
  const auth = useAuth();
  const [values, handleChange] = useForm({
    firstName: auth.user.name,
    lastName: auth.user.surname,
    email: auth.user.email,
  });



  return (
    <form autoComplete='off' noValidate {...props}>
      <Card>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText='Please specify the first name'
                label='First name'
                name='firstName'
                onChange={handleChange}
                value={values.firstName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Last name'
                name='lastName'
                onChange={handleChange}
                value={values.lastName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Email Address'
                name='email'
                onChange={handleChange}
                required
                value={values.email}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          m={2}
          justifyContent='flex-end'
        >
          <Button color='primary' variant='contained'>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
