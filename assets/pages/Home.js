import React from "react";
import { Paper } from "@mui/material";
import DayCounter from "../components/DayCounter";
import Grid from "@mui/material/Grid";
import Timer from "../components/Timer";

export default function Home() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4} order={{ xs: 2, md: 1 }}>
        <DayCounter />
      </Grid>

      <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
        <Paper elevation={5} className="title-paper">
          <h1 className="title">
            30 days <br />
            push-up
            <br /> challenge
            <br />
          </h1>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} order={{ xs: 3, md: 3 }}>
        <Timer />
      </Grid>
    </Grid>
  );
}
