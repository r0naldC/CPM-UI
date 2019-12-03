import React, { Component } from "react";

import Table from "@material-ui/core/Table";
import TableFooter from "@material-ui/core/TableFooter";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import SendIcon from "@material-ui/icons/Send";

import Result from "./Result";
import Budget from "./Budget";

import {
  calculateTotalCost,
  calculateTotalDuration,
  calculateCriticalPath,
  Activity,
  calculateBudget,
  formula1
} from "./toSpare";

class NewMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: "RD $",
      adminExpenses: 50000,
      timeUnit: "meses",
      myActivities: [
        {
          name: "A",
          pre: [],
          nDuration: {
            a: 15,
            b: 20,
            m: 23
          },
          nPrice: 37500,
          rDuration: {
            a: 10,
            b: 17,
            m: 20
          },
          rPrice: 25000
        },
        {
          name: "B",
          pre: ["A"],
          nDuration: {
            a: 15,
            b: 20,
            m: 23
          },
          nPrice: 37500,
          rDuration: {
            a: 10,
            b: 17,
            m: 20
          },
          rPrice: 25000
        },
        {
          name: "C",
          pre: ["A"],
          nDuration: {
            a: 15,
            b: 20,
            m: 23
          },
          nPrice: 37500,
          rDuration: {
            a: 10,
            b: 17,
            m: 20
          },
          rPrice: 25000
        },
        {
          name: "D",
          pre: ["B", "C"],
          nDuration: {
            a: 15,
            b: 20,
            m: 23
          },
          nPrice: 37500,
          rDuration: {
            a: 10,
            b: 17,
            m: 20
          },
          rPrice: 25000
        },
        {
          name: "E",
          pre: ["D"],
          nDuration: {
            a: 15,
            b: 20,
            m: 23
          },
          nPrice: 37500,
          rDuration: {
            a: 10,
            b: 17,
            m: 20
          },
          rPrice: 25000
        }
      ],
      criticalPath: [],
      currencyList: ["RD $", "USD $", "EUR $"],
      flatActivitiesDone: [],
      groupedActivitiesDone: [[]],
      totalCost: 0,
      totalDuration: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCurrency = this.handleCurrency.bind(this);
    this.createNewActivity = this.createNewActivity.bind(this);
    this.removeActivity = this.removeActivity.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
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
  createNewActivity() {
    this.setState({
      ...this.state.myActivities.push({
        name: "",
        pre: [],
        nDuration: {
          a: 0,
          b: 0,
          m: 0
        },
        nPrice: 0,
        rDuration: {
          a: 0,
          b: 0,
          m: 0
        },
        rPrice: 0
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

    this.setState({
      totalDuration: calculateTotalDuration(
        activities,
        this.state.groupedActivitiesDone,
        this.state.flatActivitiesDone
      )
    });

    this.setState({
      totalDuration: calculateTotalCost(
        activities,
        this.state.totalDuration,
        this.state.adminExpenses
      )
    });

    this.setState({
      criticalPath: calculateCriticalPath(this.state.groupedActivitiesDone)
    });
    console.log(this.state);
    debugger;
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
                          display={index !== 0 ? "block" : "none"}
                          // value={index !== 0 ? this.state.myActivities : null} // Values already Selected
                          value={"Select a P"}
                        >
                          {/* Handles Values in the Selection Menu */}
                          {this.state.myActivities.map(
                            ({ name }, ind) => {
                              return (
                                name !== activity.name &&
                                index > ind && (
                                  <MenuItem value={name} key={ind}>
                                    {name}
                                  </MenuItem>
                                )
                              );
                            }

                            // isValueInAnotherArray(data[index].pre, name) && (
                            //   <MenuItem value={name}>{name}<Result/MenuItem>
                            // )
                          )}
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
                        id={`nPrice-${index}`}
                        type="number"
                        value={activity.nPrice}
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
                        id={`rPrice-${index}`}
                        type="number"
                        value={activity.rPrice}
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
          <IconButton onClick={this.createNewActivity}>
            Añadir
            <AddIcon />
          </IconButton>
          <IconButton onClick={this.calculateResult}>
            Calcular
            <SendIcon />
          </IconButton>
        </Grid>

        {/* <Grid item xs={12}>
          <Result timeUnit={this.state.timeUnit} />
        </Grid> */}

        {/* <Grid item xs={12}>
          <Budget />
        </Grid> */}
      </Grid>
    );
  }
}

export default NewMain;
