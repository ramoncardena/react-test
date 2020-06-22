import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// hooks
import useStyles from "./styles";

//api
import { personas } from "../../api"

// components
import Loading from "../Loading";
import UsersList from "../UsersList";

// context
import {
  useUserState,
  useUserDispatch,
  setUsersRawList
} from "../../context/UserContext";

function App() {
  // styles
  const classes = useStyles();

  // context
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  // effect
  useEffect(() => {
    personas
      .retrieve(50)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (!data.status) {
          console.log("Personas retrieved");
          setUsersRawList(userDispatch, { usersRawList: data.results });
        } else {
          console.log("Error retrieving personas!");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [userDispatch]);

  const deleteUser = (user) => {
    console.log(user);
    const updatedList = userState.usersRawList.filter(item =>
      item.login.uuid !== user.login.uuid
    )
    setUsersRawList(userDispatch, { usersRawList: updatedList });

  }

  const editUser = (user) => {
    console.log(user);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={6}>
          <Paper className={classes.left} square>
            {userState.usersRawList !== null ?
              (<UsersList
                data={userState.usersRawList}
                onDeleteUser={(user) => deleteUser(user)}
                onEditUser={(user) => editUser(user)}
              />)
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
