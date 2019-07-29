import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ActivitiesInputs from "./ActivitiesInputs";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { calculateTotalCost } from "./toSpare";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminExpenses: 5000,
      activitiesList: [
        { name: "A", duration: 10, cost: 100000, pre: null, isDone: false },
        { name: "B", duration: 5, cost: 500000 },
        {
          name: "C",
          duration: 1,
          cost: 1000000,
          pre: ["A", "B"],
          isDone: false
        },
        { name: "D", duration: 9, cost: 2000000, pre: ["C"], isDone: false },
        { name: "E", duration: 7, cost: 800000, pre: ["C"], isDone: false },
        {
          name: "F",
          duration: 1,
          cost: 1500000,
          pre: ["D", "E"],
          isDone: false
        },
        { name: "G", duration: 4, cost: 600000, pre: ["D", "E"], isDone: false }
      ]
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
          <Grid>
            <TextField label="Gastos Administrativos" />
          </Grid>
        </Grid>
        <Grid item xs={11}>
          {this.state.activitiesList.map((activity, index) => {
            return <ActivitiesInputs key={index} />;
          })}{" "}
          <br />
          <Grid item xs={11}>
            <Button
              variant="contained"
              color="primary"
              // onClick={}
            >
              Enviar
            </Button>
          </Grid>
          <Grid item xs={11}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                calculateTotalCost(
                  this.state.activitiesList,
                  this.state.adminExpenses
                )
              }
            >
              Calcular
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default MainContainer;
