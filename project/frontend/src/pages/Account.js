import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import AccountProfile from '../components/account/AccountProfile';
import AccountProfileDetails from '../components/account/AccountProfileDetails';
import AccountPassword from '../components/account/AccountPassword';

const Account = () => (
  <>
    <Box
      m={5}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <AccountProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <AccountProfileDetails />
          </Grid>
        </Grid>
        <Box m={10}>
          <AccountPassword />
        </Box>
      </Container>
    </Box>
  </>
);

export default Account;