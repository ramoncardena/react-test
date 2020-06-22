import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      minHeight: "100vh"
    },
    left: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: "100%"
    },
    right: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: "100%"
    },
  }));