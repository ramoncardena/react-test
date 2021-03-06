import React from "react";
import PropTypes from "prop-types";
import Grid from '@material-ui/core/Grid';

// hooks
import useStyles from "./styles";
import UserCard from "../UserCard/UserCard";

/**
 * @version 1.0.0
 *
 */
export default function UsersList(props) {
  // props
  const { data, onDeleteUser, onEditUser, onMouseOver, onMouseOut, onCardClick } = props;

  // styles
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      {data.map(user =>
        <Grid item xs={12} md={6} lg={4} key={user.login.uuid}>
          <UserCard
            userData={user}
            onDeleteUser={user => onDeleteUser(user)}
            onEditUser={user => onEditUser(user)}
            onMouseOver={user => onMouseOver(user)}
            onMouseOut={user => onMouseOut(user)}
            onCardClick={user => onCardClick(user)}
          />
        </Grid>
      )}
    </Grid>
  );
}

UsersList.propTypes = {
  /** User list raw data*/
  data: PropTypes.array,
  onDeleteUser: PropTypes.func,
  onEditUser: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onCardClick: PropTypes.func
};

UsersList.defaultProps = {
  data: [],
  onDeleteUser: () => { },
  onEditUser: () => { },
  onMouseOver: () => { },
  onMouseOut: () => { },
  onCardClick: () => { }
};
