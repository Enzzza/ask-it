import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
  Grid,
} from '@material-ui/core';
import { useAuth } from '../../contexts/AuthContext';
import { UserAvatar } from '../avatar/UserAvatar';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import Email from '@material-ui/icons/Email';
import Question from '@material-ui/icons/Help';
import Answer from '@material-ui/icons/QuestionAnswer';
import { teal, lightBlue, deepOrange } from '@material-ui/core/colors';

const AccountProfile = () => {
  const auth = useAuth();
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  let now = dayjs();
  let memberSince = dayjs(auth.user.createdAt).format('YYYY/MM/DD');
  let timePassed = dayjs(memberSince).from(now);

  return (
    <Card>
      <CardContent>
        <Box display='flex'>
          <UserAvatar user={auth.user} spacing={6} />
          <div style={{ marginLeft: 20 }}>
            <Typography color='textPrimary' gutterBottom variant='h4'>
              @{auth.user.displayName}
            </Typography>
          </div>
        </Box>
        <Typography
          color='textSecondary'
          variant='body1'
          style={{ marginBottom: 20 }}
        >
          First seen {`${timePassed}`}
        </Typography>
        <Divider />
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Grid
              container
              spacing={3}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Grid item style={{ flexGrow: 1 }}>
                <Typography color='textSecondary' gutterBottom variant='h6'>
                  Email
                </Typography>
                <Typography color='textPrimary' variant='body1'>
                  {`${auth.user.email}`}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  style={{
                    backgroundColor: lightBlue[600],
                    height: 56,
                    width: 56,
                  }}
                >
                  <Email />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Grid
              container
              spacing={3}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Grid item style={{ flexGrow: 1 }}>
                <Typography color='textSecondary' gutterBottom variant='h6'>
                  Questions
                </Typography>
                <Typography color='textPrimary' variant='h4'>
                  {`0`}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  style={{ backgroundColor: teal[600], height: 56, width: 56 }}
                >
                  <Question />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Grid
              container
              spacing={3}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Grid item style={{ flexGrow: 1 }}>
                <Typography color='textSecondary' gutterBottom variant='h6'>
                  Answers
                </Typography>
                <Typography color='textPrimary' variant='h4'>
                  {`${auth.user.answerCount}`}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  style={{
                    backgroundColor: deepOrange[600],
                    height: 56,
                    width: 56,
                  }}
                >
                  <Answer />
                </Avatar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default AccountProfile;
