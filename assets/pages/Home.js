import React from "react";
import { Paper } from "@mui/material";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box>
      <Paper elevation={5} className="title-paper">
        <h1 className="title">30 days <br/>push-up<br/> challenge<br/></h1>
      </Paper>
    </Box>
  );
}
