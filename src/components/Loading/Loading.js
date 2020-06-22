import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid } from "@material-ui/core";

// styles
import useStyles from "./styles";

/**
 * @version 1.0.0
 *
 * Componente para cargar un indicador de progreso
 * de forma circular.
 *
 */
export default function Loading(props) {
  // props
  const { contained, size, thickness, color, position } = props;

  // styles
  const classes = useStyles();

  const alignment = position => {
    switch (position) {
      case "center":
        return "center";
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      default:
        return "center";
    }
  };
  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems={alignment(position)}
      justify="center"
      className={!contained ? classes.fullBox : classes.standarBox}
    >
      <Grid item>
        <div style={{ maxHeigth: "100px" }}>
          <CircularProgress
            className={classes.progress}
            size={size}
            thickness={thickness}
            color={color}
          />
        </div>
      </Grid>
    </Grid>
  );
}

Loading.propTypes = {
  /** Si es verdadero extiende la altura del conenedor a 90vh */
  contained: PropTypes.bool,
  /** Tamaño del círculo de progreso*/
  size: PropTypes.number,
  /** Grosor del círculo de progreso */
  thickness: PropTypes.number,
  /** Color del círculo de progreso (primary | secondary) */
  color: PropTypes.string,
  /** Posición del círculo de progreso */
  position: PropTypes.string
};
