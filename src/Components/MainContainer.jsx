import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ActivitiesInputs from "./ActivitiesInputs";
import Button from "@material-ui/core/Button";

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
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.newActivity}
          >
            + Agregar actividad
          </Button>
        </Grid>
        <Grid item xs={12}>
          {this.state.activitiesList.map((activity, index) => {
            return <ActivitiesInputs key={index} />;
          })}
        </Grid>
      </Grid>
    );
  }
}

export default MainContainer;
