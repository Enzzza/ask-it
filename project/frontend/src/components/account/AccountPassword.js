import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';

const AccountPassword = (props) => {
  const [values, setValues] = useState({
    currentPassword:'',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Current password"
            margin="normal"
            name="currentPassword"
            onChange={handleChange}
            type="password"
            value={values.currentPassword}
            variant="outlined"
            autoComplete='password'
          />
          <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="newPassword"
            onChange={handleChange}
            type="password"
            value={values.newPassword}
            variant="outlined"
            autoComplete='password'
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirmPassword"
            onChange={handleChange}
            type="password"
            value={values.confirmPassword}
            variant="outlined"
            autoComplete='password'
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          m={2}
          justifyContent='flex-end'
        >
          <Button
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountPassword;