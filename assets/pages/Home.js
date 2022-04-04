import React, { useEffect, useState } from "react";
import {Fab, Paper} from "@mui/material";
import DayCounter from "../components/DayCounter";
import Grid from "@mui/material/Grid";
import Timer from "../components/Timer";
import Dashboard from "../components/Dashboard";
import { useAuth } from "../utils/use-auth";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';

export default function Home() {
  const auth = useAuth();
  const [challenge, setChallenge] = useState({ day: [], participants: [] });
  const [time, setTime] = useState(false);

  const getChallege = () => {
    axios
      .get("api/challenges/3")
      .then((response) => {
        console.log(response.data);
        setChallenge(response.data);
        const serverTime = new Date(response.data.time);
        serverTime.setDate(serverTime.getDate() + 1);
        serverTime.setHours(0);
        serverTime.setMinutes(0);
        serverTime.setSeconds(0);
        setTime(serverTime);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getChallege();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3} order={{ xs: 2, md: 1 }}>
        {challenge && <DayCounter day={challenge.day} />}
      </Grid>

      <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
        <Paper elevation={5} className="title-paper">
          <h1 className="title">
            30 days <br />
            push-up
            <br /> challenge
            <br />
          </h1>
          {challenge && <Dashboard challenge={challenge} />}
        </Paper>
      </Grid>

      <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
        {time && <Timer expiryTimestamp={time} />}
        <Fab color="secondary" aria-label="edit">
          <EditIcon />
        </Fab>
      </Grid>
    </Grid>
  );
}
