import { red, purple, blue, green, orange } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const colors = {
  red: red,
  purple: purple,
  blue: blue,
  green: green,
  orange: orange,
};

const GenerateUserAvatarStyle = (profileColor, profileShade,spacing=5) => {
  console.log("function called");
  return makeStyles((theme) => ({
    profileColor: {
      color: theme.palette.getContrastText(colors[profileColor][profileShade]),
      backgroundColor: colors[profileColor][profileShade],
    },
    size: {
        width: theme.spacing(spacing),
        height: theme.spacing(spacing),
    },
  }));
};

export default GenerateUserAvatarStyle;
