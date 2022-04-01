import React, { useEffect, useState } from "react";
import { Chip, LinearProgress, Paper } from "@mui/material";
import DayCounter from "../components/DayCounter";
import Grid from "@mui/material/Grid";
import Timer from "../components/Timer";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import { useAuth } from "../utils/use-auth";
import Box from "@mui/material/Box";

export default function DashboardBars(props) {
  const [progress, setProgress] = useState(10);
  const challenge = props.challenge;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Grid container spacing={{ xs: 5 }} direction="column">
      {challenge.participants.map((participant) => (
        <Grid item key={participant.name}>
          <Box sx={{ width: "100%", height: "20px" }}>
            <Chip
              label={participant.name}
              variant="outlined"
              sx={{position: "relative", left: "-50%", transform: "translate(25px)" }}
            />
            <ProgressBar
              sx={{ height: "20px" }}
              value={participant.reps_today}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
