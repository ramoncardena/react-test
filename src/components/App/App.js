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
import EditUserModal from "../EditUserModal";
import OLMap from "../OLMap";

// context
import {
  useUserState,
  useUserDispatch,
  setUsersRawList,
  setSelectedUser
} from "../../context/UserContext";

function App() {
  // styles
  const classes = useStyles();

  // context
  const [openEdit, setOpenEdit] = useState(false);
  const userState = useUserState();
  const userDispatch = useUserDispatch();

  // effects
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


  // methods
  const deleteUser = (user) => {
    const updatedList = userState.usersRawList.filter(item =>
      item.login.uuid !== user.login.uuid
    )
    setUsersRawList(userDispatch, { usersRawList: updatedList });

  }

  const editUser = (user) => {
    const updatedList = userState.usersRawList.filter(item =>
      item.login.uuid === user.login.uuid
    )
    setSelectedUser(userDispatch, { selectedUser: updatedList[0] });
    setOpenEdit(true);
  }

  const handleEditModalClose = () => {
    setSelectedUser(userDispatch, { selectedUser: null });
    setOpenEdit(false);
  }

  
  return (
    <>
      {/* USER EDIT MODAL */}
      {userState.selectedUser !== null &&
      <EditUserModal
        open={openEdit}
        onClose={() => handleEditModalClose()}
        userUUID={userState.selectedUser.login.uuid}
      />
      } 
      {/* MAIN GRID - 2 PANELS */}
      <Grid container spacing={0}>

        {/* LEFT PANEL - USERS */}
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

        {/* RIGHT PANEL - MAP */}
        <Grid item xs={6}>
          <Paper className={classes.right} square>
            <OLMap />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
