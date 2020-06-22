import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    left: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: "100vh"
    },
    right: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: "100vh"
    },
  }));