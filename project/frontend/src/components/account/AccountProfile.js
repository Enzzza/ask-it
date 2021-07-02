import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';
import { UserAvatar } from '../avatar/UserAvatar';

const AccountProfile = (props) => {
  const auth = useAuth();

  return (
    <Card {...props}>
      <CardContent>
        <Box display='flex'>
          <UserAvatar user={auth.user} spacing={6} />
          <div style={{ marginLeft: 20 }}>
            <Typography color='textPrimary' gutterBottom variant='h3'>
              {auth.user.name? `${auth.user.name} ${auth.user.surname}`: "John Doe" }
            </Typography>
          </div>
        </Box>
        <Typography color='textSecondary' variant='body1'>
          {`${auth.user.email}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AccountProfile;
