import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { List, ListItem, ListItemText, Paper, TextField } from "@mui/material";
import axios from "axios";
import authHeader from "../utils/authHeader";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Profile() {
  const navigate = useNavigate();
  const [day, setDay] = useState({ reps_today: 0, reps_total: 0 });
  const [reps, setReps] = useState("");
  const [repsError, setRepsError] = useState({ error: false, helperText: "" });

  const getDay = () => {
    axios
      .get("api/me/day", { headers: authHeader() })
      .then((response) => {
        setDay(response.data);
      })
      .catch((error) => {
        console.log(error.response.data)
        if (error.response.data === "No active day") {
          return; //maybe disable input or put some info up
        } else {
          navigate("/login");
        }
      });
  };

  const patchDay = () => {
    if (!reps || (reps === "0")) {
      setRepsError({
        error: true,
        helperText: "Gonna cry?!",
      });
      return
    }

    axios
      .patch("api/me/day", {
        headers: authHeader(),
        reps: reps,
      })
      .then((response) => {
        setDay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDay();
  }, []);

  const validateReps = (event) => {
    const reps = event.target.value;
    if (reps > 100) {
      setRepsError({
        error: true,
        helperText: "Easy there cowboy! That's enough.",
      });
    } else {
      setRepsError({
        error: false,
        helperText: "",
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={5} sx={{ padding: "1rem" }}>
        <h2>Profile</h2>
        <List>
          <ListItem disablePadding>
            <ListItemText primary={`Today: ${day.reps_today}`} />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={`Total: ${day.reps_total}`} />
          </ListItem>
        </List>
        <TextField
          type="number"
          error={repsError.error}
          onChange={validateReps}
          onInput={e => setReps(e.target.value)}
          id="reps"
          label="Push-ups"
          helperText={repsError.helperText}
        />
        <ListItem sx={{ paddingLeft: "0" }}>
          <Button variant="contained" size="large" onClick={patchDay}>
            Submit
          </Button>
        </ListItem>
      </Paper>
    </Container>
  );
}
