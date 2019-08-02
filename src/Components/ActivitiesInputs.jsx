import React from "react";
import Grid from "@material-ui/core/Grid";
import Jobs from './toSpare';
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { Activity } from "./toSpare";

function ActivitiesInputs(props) {
  const { id } = props;
  return (
    
      
    <Grid item sm={12} lg={8} id={id} >
      <TextField  label="Actividad" value="" onChange=""/>
      <TextField label="Duracion" />
      <TextField label="Costo Por MES " />
      <TextField label="Prerequisisto" />
    </Grid>
    
  );
}

ActivitiesInputs.propTypes = {
  id: PropTypes.number
};

export default ActivitiesInputs;
