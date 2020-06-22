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
  const { data } = props;

  // styles
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      {data.map(user =>
        <Grid item xs={12} md={6} lg={4} key={user.login.uuid}>
          <UserCard userData={user} />
        </Grid>
      )}
    </Grid>
  );
}

UsersList.propTypes = {
  /** User list raw data*/
  data: PropTypes.array,
};

UsersList.defaultProps = {
  data: []
};
