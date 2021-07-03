import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Avatar,
  Grid,
} from '@material-ui/core';
import { UserAvatar } from '../avatar/UserAvatar';
import Email from '@material-ui/icons/Email';
import Question from '@material-ui/icons/Help';
import Answer from '@material-ui/icons/QuestionAnswer';
import { teal, lightBlue, deepOrange } from '@material-ui/core/colors';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

const AccountProfile = (props) => {
  if (!props.user && !props.loading) {
    return <p>User not found</p>;
  } else if (props.loading) {
    return <div>Loading....</div>;
  }

  let user = props.user;
  let displayName = user.displayName;
  let now = dayjs();
  let memberSince = dayjs(user.createdAt).format('YYYY/MM/DD');
  let timePassed = dayjs(memberSince).from(now);
  let email = user.email;
  // get it from db
  let questions = props.questions ? props.questions : 0;
  let answers = user.answerCount;
  console.log(user);
  return (
    <Card>
      <CardContent>
        <Box display='flex'>
          <UserAvatar user={user} spacing={6} />
          <div style={{ marginLeft: 20 }}>
            <Typography color='textPrimary' gutterBottom variant='h4'>
              @{displayName}
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
                  {`${email}`}
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
                  {`${questions}`}
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
                  {`${answers}`}
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
