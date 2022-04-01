import React from "react";
import { Paper } from "@mui/material";

export default function DayCounter(props) {
  return (
    <Paper elevation={5} className="title-paper" sx={{ paddingTop: "75%" }}>
      <h2 className="title">DAY {props.day}</h2>
    </Paper>
  );
}
