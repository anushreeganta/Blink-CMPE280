import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./Login.css";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Axios from "axios";
import endPointObj from "../../Config";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import LocalizedStrings from 'react-localization';
import strings from "../../localization";

const ariaLabel = { "aria-label": "description" };

function Login(props) {

  let local = new LocalizedStrings(strings);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const loginCall = (email, password) => {
    Axios.post(endPointObj.url + "api/login", {
      email,
      password,
    })
      .then((data) => {
        sessionStorage.setItem("id",data.data.id);
        sessionStorage.setItem("role", data.data.role);
        if (data === undefined) {
          setError(true);
        } else {
          navigate("/home");
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Box className="login-box" sx={{ bgcolor: "#cfe8fc", height: "80vh" }}>
          <div className="login-inputs">
            <Input
              className="login-input-email"
              inputProps={ariaLabel}
              placeholder={local.emailid}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              className="login-input-password"
              inputProps={ariaLabel}
              type="password"
              placeholder={local.password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              variant="contained"
              className="login-button"
              onClick={() => {
                loginCall(email, password);
              }}
            >
              {local.login}
            </Button>
          </div>
          {error && (
            <div className="login-div-error">
              <Alert severity="error" className="login-error">
                Failed to login
              </Alert>
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
}

Login.propTypes = {};

export default Login;
