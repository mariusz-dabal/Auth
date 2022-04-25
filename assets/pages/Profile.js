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
  const [repsError, setRepsError] = useState({ error: false, helperText: "" , disableButton: false});

var pushSmall = [
'Baby Steps!',
'Każdy ma zakwasy mordo, POMPUJ!',
'Nie zgubiłeś może zera?', 
"It's something I guess...", 
"Slow and steady", 
'Serio liczysz to że się potknąłeś?',
'A Krzysztof już skończył...',
"Watch out, we've got a badass over here..."];

var pushMid = [
'DOBRA POMPA!',
'Push it baby, push it',
'Nice pecs my man',
'Good set big man', 
'Oof, teraz serio widać różnicę',
'LEVEL UP!',
`+${reps} do zastraszania`,
`+${reps} exp w przytulaniu`,
'Ale z klaskaniem, prawda?',
'Tak to się robi!',
'Ale im pokazałeś!',
'A reszta pewnie jeszcze pije kawkę zamiast pompować!',
'Epic Bruh Moment!',
'Nice COCK fam!',
'Niedługo dupy się będą o ciebie bić, jeszcze tylko kilka pompek! Trust me DUDE!',
"That's how it's done my man!",
'EPIC WIN!',
'Damn, każdy 5cio latek ci zazdrości!',
'"Nieźle pedale! / że pompka, wiesz, rower, pedał... blisko nie? nie?! Dobra to tego nie dawaj Mariusz"'];

var pushBig = [
'Napewno dobrze policzyłeś?',
'Just... why?',
'Na co taki zły jesteś?',
'Wszystko dobrze w domu?',
'To maraton nie sprint, ale lubię twój entuzjazm',
'Coooo, zapomniało się o pompeczkach?',
'A mama mówiła, nie rób wszystkiego na ostatnią chwilę',
'CZUJESZ TEN POWER?!',
'Ktoś tu chce mieć zakwasy jutro'];

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
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
        helperText: "Give me some pushups!",
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

      if (reps > 0 && reps <= 10) {
        setRepsError({
          error: false,
          helperText: `${pushSmall[random(0,pushSmall.length-1)]}`,
        });
      }
      else if (reps > 11 && reps <= 30) {
        setRepsError({
          error: false,
          helperText: `${pushMid[random(0,pushMid.length-1)]}`,
        });
      }
      else if (reps > 30 && reps <= 99) {
        setRepsError({
          error: false,
          helperText: `${pushBig[random(0,pushBig.length-1)]}`,
        });
      }
      else if ( reps === "100") {
        setRepsError({
          error: false,
          helperText: "Napisz apkę mówili, będziemy wpisywać w trakcie dnia a nie wszystkie na raz",
        });
      }
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
        disableButton: true,
      });
    } else {setRepsError({
      error: false,
      disableButton: false,
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
          <Button variant="contained" size="large" onClick={patchDay} disabled={repsError.disableButton}>
            Submit
          </Button>
        </ListItem>
      </Paper>
    </Container>
  );
}
