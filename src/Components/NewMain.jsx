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
          nPrice: {
            a: 150,
            b: 245,
            m: 360
          },
          rDuration: {
            a: 10,
            b: 17,
            m: 20
          },
          rPrice: {
            a: 110,
            b: 230,
            m: 295
          }
        }
      ]
    };
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
                <TableCell className="tr">Importe</TableCell>
                <TableCell className="tr">Eliminar</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.myActivities.map(activity => {
                return (
                  <TableRow>
                    <TableCell>
                      <TextField
                        value={activity.name}
                        //   onChange={}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Select
                      //   value={act.pre} // Values already Selected
                      // onChange={}
                      //   renderValue={selected => <div>{selected + ''}</div>} // The way that already selected values will be rendered
                      >
                        {/* Handles Values in the Selection Menu */}
                        {/* {data.map(
                      ({ name }) =>
                        name !== act.name &&
                        isValueInAnotherArray(data[index].pre, name) && (
                          <MenuItem value={name}>{name}<Result/MenuItem>
                        )
                    )} */}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <TextField
                        // label="A"/
                        value={activity.rDuration.a}
                      ></TextField>
                      <TextField
                        // label="M"
                        // type="number"
                        value={activity.rDuration.b}
                      ></TextField>
                      <TextField
                        // label="B"
                        // type="number"
                        value={activity.rDuration.m}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={activity.nPrice.a}
                        // onChange={event => handleChange(event, "cost", index)}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="A"
                        // onChange={event => handleChange(event, "a", index)}
                      ></TextField>
                      <TextField
                        label="M"
                        type="number"
                        // onChange={event => handleChange(event, "m", index)}
                      ></TextField>
                      <TextField
                        label="B"
                        type="number"
                        // onChange={event => handleChange(event, "b", index)}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        // value={act.cost}
                        // onChange={event => handleChange(event, "cost", index)}
                      ></TextField>
                    </TableCell>
                    <TableCell> {"duration"}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
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
          <Result timeUnit={this.state.timeUnit} />
        </Grid>

        {/* <Grid item xs={12}>
          <Budget />
        </Grid> */}
      </Grid>
    );
  }
}

export default NewMain;
