import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// styles
import useStyles from "./styles";

// context
import {
    useUserState,
    useUserDispatch,
    setUsersRawList,
    setSelectedUser
  } from "../../context/UserContext";


/**
 * @version 1.0.0
 */
export default function Loading(props) {
    // props
    const { open, onClose, userUUID } = props;

    // styles
    const classes = useStyles();

    // context
    const [firstName, setFistName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phone, setPhone] = useState(null);

    const userState = useUserState();
    const userDispatch = useUserDispatch();

    
    // effects
    useEffect(() => {
        const updatedList = userState.usersRawList.filter(item =>
        item.login.uuid === userUUID
        )
        setSelectedUser(userDispatch, { selectedUser: updatedList[0] });
        setFistName(updatedList[0].name.first);
        setLastName(updatedList[0].name.last);
        setPhone(updatedList[0].phone);
    }, [userDispatch, userState.usersRawList, userUUID]);

    // methods
    const findWithAttr = (array, attr, value) => {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
    
    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {
        var usersList = userState.usersRawList;
        var index = usersList.map((item) => { 
            return item.login.uuid; 
        }).indexOf(userState.selectedUser.login.uuid);

        usersList[index].name.first = firstName;
        usersList[index].name.last = lastName;
        usersList[index].phone = phone;

        setUsersRawList(userDispatch, { usersRawList: usersList });
        onClose();
    };


    return (
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle id="form-dialog-title">Edit User Profile</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Use the form to edit user profile.
                </DialogContentText>
                <img src={userState.selectedUser.picture.large} alt={userState.selectedUser.name}/>
                <TextField
                    margin="dense"
                    id="first-name"
                    label="First name"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFistName(event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="last-name"
                    label="Last name"
                    type="text"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="phone"
                    label="Phone number"
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" variant="contained" >
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained" >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

Loading.propTypes = {
    /** User id */
    userUUID: PropTypes.string.isRequired
};
