import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

function ActivitiesInputs(props) {
  const { id } = props;
  return (
    <Grid item sm={12} lg={8} id={id}>
      <TextField label="Heyyyy?" />
      <TextField label="Hooooo?" />
      <TextField label="Haaaaaa?" />
    </Grid>
  );
}

ActivitiesInputs.propTypes = {
  id: PropTypes.number
};

export default ActivitiesInputs;
