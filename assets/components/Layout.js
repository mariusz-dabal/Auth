import React from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useAuth } from "../utils/use-auth";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  let auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signout();
    navigate("/");
  };

  return (
    <Container disableGutters maxWidth="fluid">
      {auth.token && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link to="/">Push-up Challenge</Link>
              </Typography>
              <Button color="inherit">
                <Link to="/profile">Profile</Link>
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}

      <Outlet />
    </Container>
  );
}
