import React from "react";
import PropTypes from "prop-types";
import { Paper } from "@material-ui/core";


// hooks
import useStyles from "./styles";

/**
 * @version 1.0.0
 *
 */
export default function UsersList(props) {
  // props
  const { users } = props;

  // styles
  const classes = useStyles();

  return (
   <Paper>Users List</Paper>
  );
}

UsersList.propTypes = {
  /** Unidades a mostrar después de la cantidad (por defecto: M)*/
  users: PropTypes.object,
};

UsersList.defaultProps = {
  users: {}
};
