import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import LocalizedStrings from 'react-localization';
import strings from "../../localization";

NavBarAuth.propTypes = {};

function NavBarAuth(props) {

  let local = new LocalizedStrings(strings);

  

  const redirectToLogin = () => {
    navigate("/login");
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  const navigate = useNavigate();

  return (
    <div>
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
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              color="inherit"
              onClick={() => {
                redirectToLogin();
              }}
            >
              {local.login}
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                redirectToRegister();
              }}
            >
              {local.register}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBarAuth;
