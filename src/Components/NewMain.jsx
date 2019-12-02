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

class NewMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: null,
      timeUnit: "meses",
      myActivities: [
        {
          name: "A",
          prerequisites: [],
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
          prerequisites: [],
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
        // {
        //   name: "C",
        //   prerequisites: [],
        //   nDuration: {
        //     a: 15,
        //     b: 20,
        //     m: 23
        //   },
        //   nPrice: 37500,
        //   rDuration: {
        //     a: 10,
        //     b: 17,
        //     m: 20
        //   },
        //   rPrice: 25000
        // },
        // {
        //   name: "D",
        //   prerequisites: [],
        //   nDuration: {
        //     a: 15,
        //     b: 20,
        //     m: 23
        //   },
        //   nPrice: 37500,
        //   rDuration: {
        //     a: 10,
        //     b: 17,
        //     m: 20
        //   },
        //   rPrice: 25000
        // }
      ]
      // prerequisites: ["ZX"]
    };

    this.handleChange = this.handleChange.bind(this);
    this.createNewActivity = this.createNewActivity.bind(this);
  }

  handleChange(event) {
    let id = event.target.id;
    let stateCopy = { ...this.state };

    if (id.substring(1, 9) === "Duration") {
      let propt1 = id.substring(0, id.indexOf("."));
      let propt2 = id.substring(
        id.indexOf(".") + 1,
        parseInt(id.substring(id.indexOf("-")))
      );
      let index = parseInt(id.substring(id.indexOf("-") + 1));
      debugger;
      stateCopy.myActivities[index][propt1][propt2] = event.target.value;
    } else {
      let propt = id.substring(0, id.indexOf("-"));
      let index = parseInt(id.substring(id.indexOf("-") + 1));

      stateCopy.myActivities[index][propt] = event.target.value;
    }

    this.setState({
      ...stateCopy
    });
  }

  createNewActivity() {
    this.setState({
      ...this.state.myActivities.push({
        name: "",
        prerequisites: [],
        nDuration: {},
        nPrice: 0,
        rDuration: {},
        rPrice: 0
      })
    });
    console.log(this.state);
  }

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <h1>HEllows</h1>
        <Grid item xs={12}>
          <Table className="table">
            <TableHead className="tr">
              <TableRow>
                <TableCell className="tr">Nombre</TableCell>
                <TableCell className="tr">Prerequisitos</TableCell>
                <TableCell className="tr">Duracion N</TableCell>
                <TableCell className="tr">Costo N</TableCell>
                <TableCell className="tr">Duracion R</TableCell>
                <TableCell className="tr">Costo R</TableCell>
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
                        // value={this.state.timeUnit}
                        onChange={this.handleChange}
                        //   onChange={}
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
                        value={activity.nDuration.a}
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
                        // onChange={event => handleChange(event, "b", index)}
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
                      //   onClick={() => removeActivity(data[index].name)}
                      >
                        <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
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
          <IconButton>
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
