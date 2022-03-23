import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.css";
import App from "./components/App";
import { ProvideAuth } from "./utils/use-auth";
import { CssBaseline } from "@mui/material";

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <Router>
        <CssBaseline />
        <App />
      </Router>
    </ProvideAuth>
  </React.StrictMode>,
  document.getElementById("root")
);
