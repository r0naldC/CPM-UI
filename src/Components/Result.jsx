import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
function Result({ state }) {
  const {
    timeUnit,
    criticalPath,
    totalCost,
    totalDuration,
    currency,
    rcriticalPath,
    rtotalCost,
    rtotalDuration
  } = state;

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={12}>
        {console.log(state)}
        {console.log(timeUnit)}

        {console.log(criticalPath)}
        <Table className="table">
          <TableHead className="tr">
            <TableRow>
              <TableCell className="tr">Duracion Total</TableCell>
              <TableCell className="tr">Costo Total</TableCell>
              <TableCell className="tr">Ruta Critica</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{`${totalDuration} ${timeUnit}`}</TableCell>
              <TableCell>{`${totalCost} ${currency}`}</TableCell>
              <TableCell>
                (
                {criticalPath.map(act => {
                  return `${act[0].name}, `;
                })}
                )
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{`${rtotalDuration} ${timeUnit}`}</TableCell>
              <TableCell>{`${rtotalCost} ${currency}`}</TableCell>
              <TableCell>
                (
                {rcriticalPath.map(act => {
                  return `${act[0].name}, `;
                })}
                )
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}

export default Result;
