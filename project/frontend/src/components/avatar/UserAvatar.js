import React  from 'react';
import Avatar from '@material-ui/core/Avatar';
import GenerateUserAvatarStyle from '../../utils/GenerateUserAvatarStyle';

export const UserAvatar = React.memo((props) => {
  const user = props.user;
  const spacing = props.spacing?props.spacing:5;
  const classes = GenerateUserAvatarStyle(user.profileColor,user.profileShade,spacing)();
  
  return (
    <Avatar className={`${classes.profileColor} ${classes.size}`}>
      {user.name? user.name.toUpperCase().charAt(0) + user.surname.toUpperCase().charAt(0): user.email.toUpperCase().charAt(0)}
    </Avatar>
  );
})


