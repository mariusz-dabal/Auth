import React from "react";
import { Paper } from "@mui/material";
import { useTimer } from "react-timer-hook";

export default function Timer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  const formatTime = (time) => {
    return String(time).padStart(2, '0')
  }

  return (
    <Paper elevation={5} className="title-paper" sx={{ paddingTop: "75%" }}>
      <h2 className="title">
        {formatTime(hours)}
        :
        {formatTime(minutes)}
        :
        {formatTime(seconds)}
      </h2>
    </Paper>
  );
}
