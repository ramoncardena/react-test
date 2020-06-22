import React from "react";
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// components


// styles
import useStyles from "./styles";

/**
 * @version 1.0.0
 *
 */
export default function UserCard(props) {
    // props
    const { userData } = props;

    // styles
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={userData.picture.large}
                    title={userData.name.first + " " + userData.name.last}
                />
                <CardContent className={classes.content}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {userData.name.first + " " + userData.name.last}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {userData.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {userData.phone}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.actions}>
                <Button variant="contained" size="small" color="primary">
                    Edit
                </Button>
                <Button variant="contained" size="small" color="error">
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

UserCard.propTypes = {
    /** User information to build the card  */
    userData: PropTypes.object.isRequired,

};

UserCard.defaultProps = {
    userData: {}
};
