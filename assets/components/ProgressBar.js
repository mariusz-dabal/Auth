import React from "react";
import { LinearProgress, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function ProgressBar(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center"}}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}`}</Typography>
      </Box>
    </Box>
  );
}
