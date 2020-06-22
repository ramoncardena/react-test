import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";

import App from './components/App';
import Themes from "./themes";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
    <UserProvider>
      <ThemeProvider theme={Themes.default}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </UserProvider>,
  document.getElementById('root')
);
