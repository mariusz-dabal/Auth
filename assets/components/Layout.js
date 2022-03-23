import React from "react";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useAuth } from "../utils/use-auth";

export default function Layout() {
  let auth = useAuth();

  const handleLogout = () => {
    auth.signout();
  };

  return (
    <Container disableGutters maxWidth={false}>
      {auth.token && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
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
