import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import SendIcon from "@material-ui/icons/Send";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import Result from "./Result";

import {
  calculateTotalCost,
  calculateTotalDuration,
  calculateCriticalPath,
  rcalculateTotalCost,
  rcalculateTotalDuration,
  rcalculateCriticalPath
} from "./toSpare";

class NewMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "RD $",
      adminExpenses: 35000,
      timeUnit: "meses",
      myActivities: [
        {
          name: "A",
          pre: [],
          rpre: [],
          nDuration: {
            a: 1,
            b: 3,
            m: 2
          },
          cost: 100000,
          rDuration: {
            a: 0.5,
            b: 2,
            m: 1
          },
          rcost: 25000,
          duration: 0,
          rduration: 0
        },
        {
          name: "B",
          pre: ["A"],
          rpre: ["A"],
          nDuration: {
            a: 4,
            b: 6,
            m: 5
          },
          cost: 1000000,
          rDuration: {
            a: 3,
            b: 5,
            m: 4
          },
          rcost: 90000,
          duration: 0,
          rduration: 0
        },
        {
          name: "C",
          pre: ["A"],
          rpre: ["A"],
          nDuration: {
            a: 2,
            b: 4,
            m: 3
          },
          cost: 500000,
          rDuration: {
            a: 1,
            b: 3,
            m: 2
          },
          rcost: 10000,
          duration: 0,
          rduration: 0
        },
        {
          name: "D",
          pre: ["B", "C"],
          rpre: ["B", "C"],
          nDuration: {
            a: 5,
            b: 7,
            m: 6
          },
          cost: 900000,
          rDuration: {
            a: 4,
            b: 6,
            m: 5
          },
          rcost: 81000,
          duration: 0,
          rduration: 0
        },
        {
          name: "E",
          pre: ["D"],
          rpre: ["D"],
          nDuration: {
            a: 3,
            b: 5,
            m: 4
          },
          cost: 700000,
          rDuration: {
            a: 2,
            b: 4,
            m: 3
          },
          rcost: 35000,
          duration: 0,
          rduration: 0
        }
      ],
      criticalPath: [],
      currencyList: ["RD $", "USD $", "EUR $"],
      timeUnitList: ["horas", "días", "meses", "años"],
      flatActivitiesDone: [],
      groupedActivitiesDone: [[]],
      totalCost: 0,
      totalDuration: 0,
      rcriticalPath: [],
      rflatActivitiesDone: [],
      rgroupedActivitiesDone: [[]],
      rtotalCost: 0,
      rtotalDuration: 0,
      wasCalculated: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.createNewActivity = this.createNewActivity.bind(this);
    this.removeActivity = this.removeActivity.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.expectedTime = this.expectedTime.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.handleTimeUnit = this.handleTimeUnit.bind(this);
    this.clearTable = this.clearTable.bind(this);
    this.addPre = this.addPre.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let stateCopy = { ...this.state };
    let eType = event.target.type;

    if (id.substring(1, 9) === "Duration") {
      // console.log(id);
      let propt1 = id.substring(0, id.indexOf("."));
      let propt2 = id.substring(id.indexOf(".") + 1, id.indexOf("-"));
      let index = parseInt(id.substring(id.indexOf("-") + 1));
      // debugger;
      stateCopy.myActivities[index][propt1][propt2] =
        eType === "number" ? parseInt(event.target.value) : event.target.value;
    } else {
      let propt = id.substring(0, id.indexOf("-"));
      let index = parseInt(id.substring(id.indexOf("-") + 1));

      stateCopy.myActivities[index][propt] =
        eType === "number" ? parseInt(event.target.value) : event.target.value;
    }

    this.setState({
      ...stateCopy
    });
  }

  handleCurrency(event) {
    this.setState({
      currency: event.target.value
    });
  }

  handleTimeUnit(event) {
    this.setState({
      timeUnit: event.target.value
    });
  }

  createNewActivity() {
    this.setState({
      ...this.state.myActivities.push({
        name: "",
        pre: [],
        rpre: [],
        nDuration: {
          a: 0,
          b: 0,
          m: 0
        },
        cost: 0,
        rDuration: {
          a: 0,
          b: 0,
          m: 0
        },
        rcost: 0,
        duration: 0,
        rduration: 0
      })
    });
    console.log(this.state);
  }

  removeActivity(event) {
    let index = parseInt(
      event.target.id.substring(event.target.id.indexOf("-") + 1)
    );
    this.setState({ ...this.state.myActivities.splice(index, 1) });
  }

  calculateResult() {
    let activities = this.state.myActivities;
    this.setDuration();

    this.setState({
      totalDuration: calculateTotalDuration(
        activities,
        this.state.groupedActivitiesDone,
        this.state.flatActivitiesDone
      )
    });

    activities.map(act => {
      return (act.isDone = false);
    });

    this.setState({
      rtotalDuration: rcalculateTotalDuration(
        activities,
        this.state.rgroupedActivitiesDone,
        this.state.rflatActivitiesDone
      )
    });

    this.setState({
      totalCost: calculateTotalCost(
        activities,
        this.state.totalDuration,
        this.state.adminExpenses
      ),
      rtotalCost: rcalculateTotalCost(
        activities,
        this.state.rtotalDuration,
        this.state.adminExpenses
      )
    });

    this.setState({
      criticalPath: calculateCriticalPath(this.state.groupedActivitiesDone),
      rcriticalPath: rcalculateCriticalPath(this.state.rgroupedActivitiesDone),
      wasCalculated: true
    });

    console.log(this.state);
  }

  expectedTime(durations) {
    let a = durations.a;
    let b = durations.b;
    let m = durations.m;
    return parseInt(((a + 4.0 * m + b) / 6.0).toFixed(2));
  }

  setDuration() {
    let activitiesCopy = { ...this.state.myActivities };
    this.state.myActivities.map((activity, index) => {
      activitiesCopy[index].duration = this.expectedTime(activity.nDuration);
      activitiesCopy[index].rduration = this.expectedTime(activity.rDuration);
    });
  }

  addPre(event) {
    let activities = [...this.state.myActivities];
    let index = parseInt(event.target.name);
    let value = event.target.value;
    let elPosition = activities[index].pre.indexOf(value);

    // debugger;
    elPosition > -1
      ? activities[index].pre.splice(elPosition, 1)
      : activities[index].pre.push(value);

    this.setState({
      myActivities: activities
    });
  }

  clearTable() {
    this.setState({
      adminExpenses: 0,
      currency: "RD $",
      timeUnit: "meses",
      myActivities: []
    });
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            id={"adminExpenses"}
            value={this.state.adminExpenses}
            onChange={this.handleChange}
          ></TextField>
          <Select
            id={"currency"}
            value={this.state.currency}
            onChange={this.handleCurrency}
          >
            {this.state.currencyList.map((curr, index) => {
              return (
                <MenuItem value={curr} key={index}>
                  {curr}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            id={"timeUnit"}
            value={this.state.timeUnit}
            onChange={this.handleTimeUnit}
          >
            {this.state.timeUnitList.map((tUnit, index) => {
              return (
                <MenuItem value={tUnit} key={index}>
                  {tUnit}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Table className="table">
            <TableHead className="tr">
              <TableRow>
                <TableCell className="tr">Nombre</TableCell>
                <TableCell className="tr">Prerequisitos</TableCell>
                <TableCell className="tr">Duración Normal</TableCell>
                <TableCell className="tr">Costo Normal</TableCell>
                <TableCell className="tr">Duración Reducida</TableCell>
                <TableCell className="tr">Costo Reducido</TableCell>
                {/* <TableCell className="tr">Te N</TableCell>
                <TableCell className="tr">Te R</TableCell>
                <TableCell className="tr">Vte N</TableCell>
                <TableCell className="tr">Vte r</TableCell>
                <TableCell className="tr">Importe</TableCell>*/}
                <TableCell className="tr">Eliminar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.myActivities.map((activity, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        id={`name-${index}`}
                        value={this.state.myActivities[index].name}
                        onChange={this.handleChange}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      {index != 0 && (
                        <Select
                          name={`${index}`}
                          display={index !== 0 ? "block" : "none"}
                          value={activity.pre}
                          renderValue={selected => <div>{selected + ""}</div>}
                          onChange={this.addPre}
                        >
                          {/* Handles Values in the Selection Menu */}
                          {this.state.myActivities.map(({ name }, ind) => {
                            return (
                              name !== activity.name &&
                              index > ind && (
                                <MenuItem value={name} key={ind}>
                                  {name}
                                </MenuItem>
                              )
                            );
                          })}
                        </Select>
                      )}
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`nDuration.a-${index}`}
                        label="A"
                        type="number"
                        value={activity.nDuration.a}
                        onChange={this.handleChange}
                      ></TextField>
                      <TextField
                        id={`nDuration.b-${index}`}
                        label="B"
                        type="number"
                        value={activity.nDuration.b}
                        onChange={this.handleChange}
                      ></TextField>
                      <TextField
                        id={`nDuration.m-${index}`}
                        label="M"
                        type="number"
                        value={activity.nDuration.m}
                        onChange={this.handleChange}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`cost-${index}`}
                        type="number"
                        value={activity.cost}
                        onChange={this.handleChange}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`rDuration.a-${index}`}
                        label="A"
                        value={activity.rDuration.a}
                        onChange={this.handleChange}
                      ></TextField>
                      <TextField
                        id={`rDuration.b-${index}`}
                        label="B"
                        type="number"
                        value={activity.rDuration.b}
                        onChange={this.handleChange}
                      ></TextField>
                      <TextField
                        id={`rDuration.m-${index}`}
                        label="M"
                        type="number"
                        value={activity.rDuration.m}
                        onChange={this.handleChange}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id={`rcost-${index}`}
                        type="number"
                        value={activity.rcost}
                        onChange={this.handleChange}
                      ></TextField>
                    </TableCell>
                    {/* <TableCell> {"duration"}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell> */}
                    <TableCell>
                      <IconButton
                        id={`Btn.name-${index}`}
                        onClick={this.removeActivity}
                      >
                        <DeleteForeverOutlinedIcon />
                        {/* <DeleteForeverOutlinedIcon id={`Btn.name-${index}`} /> */}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={12}>
          <IconButton onClick={this.clearTable}>
            Limpiar
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton onClick={this.createNewActivity}>
            Añadir
            <AddIcon />
          </IconButton>
          <IconButton onClick={this.calculateResult}>
            Calcular
            <SendIcon />
          </IconButton>
        </Grid>

        {this.state.wasCalculated && (
          <Grid item xs={12}>
            <Result state={this.state} />
          </Grid>
        )}

        {/* <Grid item xs={12}>
          <Budget />
        </Grid> */}
      </Grid>
    );
  }
}

export default NewMain;
