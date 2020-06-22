import React from "react";

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "STORE_TABLE_OPTIONS":
      localStorage.setItem(
        "companiesFilterList",
        JSON.stringify(action.payload.companiesFilterList)
      );
      return {
        ...state,
        companiesFilterList: action.payload.companiesFilterList
      };
    case "STORE_TABLE_PAGE":
      localStorage.setItem(
        "userPage",
        Number(action.payload.userPage)
      );
      return {
        ...state,
        userPage: Number(action.payload.userPage)
      };

    case "RESET_TABLE_PAGE":
      localStorage.setItem("userPage", 0);
      return {
        ...state,
        userPage: 0
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  //console.log(JSON.parse(localStorage.getItem("companiesFilterList")));
  const [state, dispatch] = React.useReducer(userReducer, {
    companiesFilterList: JSON.parse(
      localStorage.getItem("companiesFilterList")
    ),
    userPage: localStorage.getItem("userPage")
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
      "useCompaniesState debe utilizarse dentro de un UserProvider"
    );
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCompaniesDispatch debe utilizarse dentro de un UserProvider"
    );
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  setUserFilters,
  setUserPage,
  resetUserPage
};

// ###########################################################

function setUserFilters(dispatch, data) {
  dispatch({
    type: "STORE_TABLE_OPTIONS",
    payload: data
  });
}

function setUserPage(dispatch, data) {
  dispatch({
    type: "STORE_TABLE_PAGE",
    payload: data
  });
}

function resetUserPage(dispatch, data) {
  dispatch({
    type: "RESET_TABLE_PAGE",
    payload: data
  });
}
