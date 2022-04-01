import React, { useEffect, useState } from "react";
import {
  Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export default function Dashboard(props) {
  const challenge = props.challenge;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Today</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Days Done</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {challenge && challenge.participants.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.reps_today}</TableCell>
              <TableCell align="right">{row.reps_total}</TableCell>
              <TableCell align="right">{row.days_done}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
