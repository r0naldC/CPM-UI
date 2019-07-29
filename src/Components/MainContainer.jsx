import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ActivitiesInputs from "./ActivitiesInputs";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";




class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedCosts: 0,
      activitiesList: ["A", "B", "C"]
    };

    this.newActivity = this.newActivity.bind(this);
  }

  newActivity() {
    const activities = this.state.activitiesList;
    activities.push({
      ActivityName: "D",
      ActivityDuration: 5,
      Costo: 75000
    });

    this.setState({
      activitiesList: activities
    });
  }

  render() {
    return (
     
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={11}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.newActivity}

          >
            + Agregar actividad
          </Button>
          <Grid >
          <TextField  label="Gastos Administrativos" />
          </Grid>
        </Grid>
        <Grid item xs={11}>
          {this.state.activitiesList.map((activity, index) => {
            return <ActivitiesInputs key={index} />;
          })} <br/>
          <Grid item xs={11}>
            <Button
            variant="contained"
            color="primary"
          // onClick={}

          >
           Enviar
         </Button>
          </Grid>
        </Grid>
          
      </Grid>
     
    );
  }
}

export default MainContainer;
