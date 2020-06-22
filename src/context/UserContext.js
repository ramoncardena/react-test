import React from "react";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "USERS_RAW_LIST":
      return {
        ...state,
        usersRawList: action.payload.usersRawList
      };
    case "USERS_LIST":
      return {
        ...state,
        usersList: action.payload.usersList
      };
    case "SELECTED_USER":
      return {
        ...state,
        selectedUser: action.payload.selectedUser
      };
    case "RESET_SELECTED_USER":
      return {
        ...state,
        selectedUser: null
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  //console.log(JSON.parse(localStorage.getItem("companiesFilterList")));
  const [state, dispatch] = React.useReducer(userReducer, {
    usersRawList: null,
    usersList: null,
    selectedUser: null,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error(
      "useUserState must be used inside a UserProvider"
    );
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useUserDispatch must be used inside a UserProvider"
    );
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  setUsersRawList,
  setUsersList,
  setSelectedUser,
  resetSelectedUser
};

// ###########################################################

function setUsersRawList(dispatch, data) {
  dispatch({
    type: "USERS_RAW_LIST",
    payload: data
  });
}

function setUsersList(dispatch, data) {
  dispatch({
    type: "USERS_LIST",
    payload: data
  });
}

function setSelectedUser(dispatch, data) {
  dispatch({
    type: "SELECTED_USER",
    payload: data
  });
}

function resetSelectedUser(dispatch, data) {
  dispatch({
    type: "RESET_SELECTED_USER",
    payload: data
  });
}
