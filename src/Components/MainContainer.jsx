import React, { useState, useEffect } from "react";

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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import SendIcon from "@material-ui/icons/Send";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import "./css.css";

import {
  calculateTotalCost,
  calculateTotalDuration,
  calculateCriticalPath,
  Activity,
  calculateBudget,
  formula1
} from "./toSpare";
import { isValueInAnotherArray, canRemoveActivity } from "./comprobation";
let resul;
let sampleData = [
  new Activity("A", 2.0, 1.0, 100000, 50000),
  new Activity("B", 5.0, 3.0, 1000000, 50000, "A"),
  new Activity("C", 3.0, 1.5, 500000, 25000, "A"),
  new Activity("D", 6.0, 4.0, 900000, 60000, "B", "C"),
  new Activity("E", 4.0, 2.0, 700000, 40000, "D")
  // new Activity("F", 1, 1500000, "D", "E"),
  // new Activity("G", 4, 600000, "D", "E")
];

const currencies = ["RD$", "US$", "EU$"];
const timeMeasureList = ["dias", "meses", "años"];

let flatActivitiesDone = [];
let groupedActivitiesDone = [[]];
let groupedActivitiesDone2 = [[]];
let sampleAdminExpenses = 35000;

function App() {
  let [data, setData] = useState([]);
  let [adminExpenses, setExpenses] = useState(sampleAdminExpenses);
  let [cost, setCost] = useState(0);
  let [cost2, setCost2] = useState(0);
  let [duration, setDuration] = useState(0);
  let [duration2, setDuration2] = useState(0);
  let [criticalPath, setCriticalPath] = useState([]);
  let [criticalPath2, setCriticalPath2] = useState([]);
  let [budget, setBudget] = useState([]);
  let [budget2, setBudget2] = useState([]);
  let [formula, setFormula] = useState(0);
  let [formula1, setFormula1] = useState(0);
  let [formula2, setFormula2] = useState(0);
  let [wasCalculated, setCalc] = useState(false);

  let [inCurrency, setInCurrency] = useState(currencies[0]);
  let [outCurrency, setOutCurrency] = useState(currencies[0]);
  let [timeMeasures, setTimeMeasures] = useState(timeMeasureList);
  let [timeMeasure, setTimeMeasure] = useState(timeMeasureList[0]);

  const handleData = data => {
    let data1 = data.map(actv => {
      return {
        name: actv.name,
        duration: actv.duration,
        cost: actv.cost,
        pre: actv.pre,
        isDone: actv.isDone
      };
    });

    let data2 = data.map(actv => {
      return {
        name: actv.name,
        duration: actv.duration2,
        cost: actv.cost2,
        pre: actv.pre,
        isDone: actv.isDone
      };
    });

    // debugger;
    setDuration(
      calculateTotalDuration(data1, groupedActivitiesDone, flatActivitiesDone)
    );
    setDuration2(
      calculateTotalDuration(data2, groupedActivitiesDone2, flatActivitiesDone)
    );

    setCost(calculateTotalCost(data, duration, adminExpenses));
    setCost2(calculateTotalCost(data2, duration2, adminExpenses));

    debugger;
    setCriticalPath(calculateCriticalPath(groupedActivitiesDone));
    debugger;
    setCriticalPath2(calculateCriticalPath(groupedActivitiesDone2));

    setBudget(calculateBudget(groupedActivitiesDone, adminExpenses));
    setBudget2(calculateBudget(groupedActivitiesDone2, adminExpenses));
    // setFormula(formula1(a,m,b));

    // console.log(formula);
    setCalc(true);
    setTimeMeasures(() => {
      return timeMeasureList;
    });
  };

  function handleChangeadmExpenses(event) {
    setExpenses(parseInt(event.target.value));
  }

  function handleChangeInCurrency(event) {
    setInCurrency(parseInt(event.target.value));
  }

  function handleChangeOutCurrency(event) {
    setOutCurrency(parseInt(event.target.value));
  }

  function handleChangeTimeMeasure(event) {
    // debugger;
    setTimeMeasures(parseInt(event.target.value));
  }

  return (
    <div className="App">
      <Form
        onSubmit={handleData}
        handleChangeadmExpenses={handleChangeadmExpenses}
        adminExpenses={adminExpenses}
        timeMeasures={timeMeasures}
        timeMeasure={timeMeasure}
        handleChangeInCurrency={handleChangeInCurrency}
        handleChangeOutCurrency={handleChangeOutCurrency}
        handleChangeTimeMeasure={handleChangeTimeMeasure}
      />

      {wasCalculated && (
        <div>
          <div className="horizontal-divisor"></div>
          <Results
            duration={duration}
            duration2={duration2}
            cost={cost}
            cost2={cost2}
            criticalPath={criticalPath}
            criticalPath2={criticalPath2}
            budget={budget}
            budget2={budget2}
            adminExpenses={adminExpenses}
          />
        </div>
      )}
    </div>
  );
}

// }
// Probably can use this to render a Chip with delete button
function preChip(value, handleDeleteFN = () => {}) {
  return <Chip label={value} onDelete={handleDeleteFN} color="primary" />;
}

function Form({
  onSubmit,
  handleChangeadmExpenses,
  adminExpenses,
  timeMeasures,
  timeMeasure,
  handleChangeInCurrency,
  handleChangeOutCurrency,
  handleChangeTimeMeasure
}) {
  let [data, setData] = useState(sampleData);
  let [names, setName] = useState("");

  function handleChange({ target: { value } }, key, index) {
    let newData = [...data];
    newData[index][key] = key === "name" ? value : parseInt(value);
    setData(newData);
    console.log(data);
    // debugger;
  }
  function formula1(a, m, b) {
    console.log((a + 4.0 * m + b) / 6.0);
    // debugger;
    return ((a + 4.0 * m + b) / 6.0).toFixed(2);
  }

  function setDuration(action) {
    action.duration = formula1(action.a, action.m, action.b);
    console.log(action);
    // debugger;
  }

  function addPre({ target: { value } }, index) {
    let newData = [...data];
    newData[index].pre.push(value);
    setData(newData);
    console.log(newData);
    // debugger;
  }

  function removePre(activityName, index) {
    let newData = [...data];
    newData[index].pre = newData[index].pre.filter(el => el !== activityName);
    setData(newData);
  }

  function removeActivity(activityName) {
    let newData = [...data];

    if (!canRemoveActivity(data, activityName)) {
      alert("Esta actividad es prerequisito de otra.");
      return;
    }

    newData = newData.filter(el => el.name !== activityName);
    // console.log(newData);
    setData(newData);
    // debugger;
  } // Check if there's an activity that has this one as a prerequisite

  function createNewActivity() {
    setData([...data, new Activity("", 0, 0)]);
    // debugger;
  }

  //}
  useEffect(() => {
    formula1();
    // debugger;
    // createNewActivity();
    // createNewActivity();
  }, []);

  return (
    <Grid container xs={4}>
      <Grid item>
        <Select
          labelId="Unidad de medida de tiempo"
          value={timeMeasure}
          onChange={handleChangeTimeMeasure}
        >
          <MenuItem value={0}>{timeMeasures[0]}</MenuItem>
          <MenuItem value={1}>{timeMeasures[1]}</MenuItem>
          <MenuItem value={2}>{timeMeasures[2]}</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
        <TextField
          className="tr2"
          label="Gastos Administrativos"
          type="number"
          value={adminExpenses}
          onChange={handleChangeadmExpenses}
        ></TextField>

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
              <TableCell className="tr">Importe</TableCell> */}
              <TableCell className="tr">Confirmar / Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((act, index) => {
              return (
                <TableRow>
                  <TableCell>
                    {" "}
                    <TextField
                      value={act.name}
                      onChange={event => handleChange(event, "name", index)}
                    ></TextField>{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {index !== 0 && (
                      <Select
                        value={act.pre} // Values already Selected
                        onChange={event => {
                          addPre(event, index);
                        }}
                        renderValue={selected => <div>{selected + ""}</div>} // The way that already selected values will be rendered
                      >
                        {/* Handles Values in the Selection Menu */}
                        {data.map(
                          ({ name }) =>
                            name !== act.name &&
                            isValueInAnotherArray(data[index].pre, name) && (
                              <MenuItem value={name}>{name}</MenuItem>
                            )
                        )}
                      </Select>
                    )}{" "}
                  </TableCell>

                  <TableCell>
                    <TextField
                      label="A"
                      type="number"
                      value={act.a}
                      onChange={event => handleChange(event, "a", index)}
                    ></TextField>
                    <TextField
                      label="M"
                      type="number"
                      value={act.b}
                      onChange={event => handleChange(event, "b", index)}
                    ></TextField>
                    <TextField
                      label="B"
                      type="number"
                      value={act.m}
                      onChange={event => handleChange(event, "m", index)}
                    ></TextField>
                  </TableCell>

                  <TableCell>
                    {" "}
                    <TextField
                      type="number"
                      value={act.cost}
                      onChange={event => handleChange(event, "cost", index)}
                    ></TextField>{" "}
                  </TableCell>

                  <TableCell>
                    {" "}
                    <TextField
                      label="A"
                      type="number"
                      value={act.a2}
                      onChange={event => handleChange(event, "a", index)}
                    ></TextField>
                    <TextField
                      label="M"
                      type="number"
                      value={act.m2}
                      onChange={event => handleChange(event, "m", index)}
                    ></TextField>
                    <TextField
                      label="B"
                      type="number"
                      value={act.b2}
                      onChange={event => handleChange(event, "b", index)}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <TextField
                      type="number"
                      value={act.cos2}
                      onChange={event => handleChange(event, "cost", index)}
                    ></TextField>{" "}
                  </TableCell>
                  {/* <TableCell></TableCell> */}
                  {/* <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell> */}

                  <TableCell>
                    {/* <IconButton onClick={() => setDuration(act)}>
                      {" "}
                      <CheckCircleIcon> </CheckCircleIcon>{" "}
                    </IconButton>{" "} */}
                    <IconButton
                      onClick={() => removeActivity(data[index].name)}
                    >
                      {" "}
                      <DeleteForeverOutlinedIcon>
                        {" "}
                      </DeleteForeverOutlinedIcon>{" "}
                    </IconButton>{" "}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <Grid>
              <IconButton
                onClick={() => {
                  createNewActivity();
                }}
              >
                {" "}
                <AddIcon /> Añadir{" "}
              </IconButton>
              <IconButton
                onClick={() => {
                  onSubmit(data);
                }}
              >
                {" "}
                <SendIcon> </SendIcon> Calcular
              </IconButton>
            </Grid>
          </TableFooter>
        </Table>
      </Grid>
      <br />
      <hr />
    </Grid>
  );
}

function Results({
  duration,
  duration2,
  cost,
  cost2,
  criticalPath,
  criticalPath2,
  budget,
  budget2,
  adminExpenses
}) {
  debugger;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Table className="table">
          <TableHead className="tr">
            <TableRow>
              <TableCell className="tr">Tipo</TableCell>
              <TableCell className="tr">Duracion Total</TableCell>
              <TableCell className="tr">Costo Total</TableCell>
              <TableCell className="tr">Ruta Critica</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Normal</TableCell>
              <TableCell>{duration} Meses</TableCell>
              <TableCell>{cost + duration * adminExpenses}</TableCell>
              <TableCell>
                {criticalPath.map(element => (
                  <span>{`(${element[0].name})` + " "}</span>
                ))}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Reducida</TableCell>
              <TableCell>{duration} Meses</TableCell>
              <TableCell>{cost2 + duration2 * adminExpenses}</TableCell>
              <TableCell>
                {criticalPath.map(element => (
                  <span>{`(${element[0].name})` + " "}</span>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <br />
      <hr />

      {/* <Grid container>
        <Grid item xs={12}>
          <Table className="table1">
            <TableHead className="tr">
              <TableRow>
                <TableCell className="tr">Presupuesto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <div className="tr1">
                  <TableCell>
                    {budget.map((elem, index) => {
                      return (
                        <p>
                          {" "}
                          Mes {index + 1}, {elem}
                        </p>
                      );
                    })}
                  </TableCell>
                </div>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
     */}
    </Grid>

    // <div>
    //   <h1>Resultados</h1>
    //   <p>Duracion Total: {duration} meses</p>
    //   <p>Costo Total: RD${cost + (duration * adminExpenses)}</p>
    //   <span>Ruta Critica: </span>
    //   {criticalPath.map(element => <span>{`(${element[0].name})` + ' '}</span>)}
    //   <h2>Presupuesto</h2>
    //   <Table className="table-sm">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell className="table-cell-sm">Mes</TableCell>
    //         <TableCell>Costo</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {budget.map((elem, index) => {
    //         return <TableRow>
    //           <TableCell>{index}.</TableCell>
    //           <TableCell>{elem}</TableCell>
    //         </TableRow>
    //       })}
    //     </TableBody>
    //   </Table>
    // </div>
  );
}

export default App;
