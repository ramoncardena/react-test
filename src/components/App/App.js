import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// hooks
import useStyles from "./styles";

//api
import { personas } from "../../api"

// components
import Loading from "../Loading";
import UsersList from "../UsersList";

function App() {
  // styles
  const classes = useStyles();

  //state
  const [personasRaw, setPersonasRaw] = useState(null);

  // effect
  useEffect(() => {
    personas
      .retrieve(50)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (!data.status) {
          console.log("Personas retrieved");
          setPersonasRaw(data.results);
        } else {
          console.log("Error retrieving personas!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Paper className={classes.left} square>
            {personasRaw !== null ?
              (<UsersList data={personasRaw} />)
              :
              (<Loading />)
            }
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
