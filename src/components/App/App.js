import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// hooks
import useStyles from "./styles";

function App() {
   // styles
   const classes = useStyles();

  return (
    <div className={classes.root}>
    <Grid container spacing={0}>
      <Grid item xs={6}>
        <Paper className={classes.left} square>

        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.right} square>
        
        </Paper>
      </Grid>
    </Grid>
  </div>
  );
}

export default App;
