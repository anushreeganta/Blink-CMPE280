import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "./Register.css";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Select from "react-select";
import Axios from "axios";
import endPointObj from "../../Config";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import LocalizedStrings from 'react-localization';
import strings from "../../localization";

const ariaLabel = { "aria-label": "description" };

Register.propTypes = {};

function Register(props) {
  let local = new LocalizedStrings(strings);
  const navigate = useNavigate();

  const optionsUser = [
    { value: "Admin", label: "Admin" },
    { value: "Normal", label: "Normal" },
  ];

  const optionsTags = [
    { value: "Tag1", label: "Tag1" },
    { value: "Tag2", label: "Tag2" },
  ];

  const [next, setNext] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [username, setUsername] = useState("");
  const [tags, setTags] = useState(optionsTags);
  const [userType, setUserType] = useState("");
  const [userTags, setUserTags] = useState([]);
  const [alert, setAlert] = useState("");

  const registerClick = async (
    email,
    password,
    cpassword,
    username,
    tags,
    role
  ) => {
    //console.log(email, password, cpassword, username, userTags, userType)

    try {
      let res = await Axios.post(endPointObj.url + "api/register", {
        email,
        password,
        role,
        username,
        tags,
      });
      navigate("/home");
      sessionStorage.setItem("id",res.data.id)
      sessionStorage.setItem("role", res.data.role);
    } catch (e) {
      setAlert(e.response.data);
    }
  };

  const getTags = async () => {
    let data = await Axios.get(endPointObj.url + "api/getTags");
    let tagArr = [];
    data.data.forEach((ele) => {
      tagArr.push({ value: ele.tagName, label: ele.tagName });
    });

    setTags(tagArr);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
      <Container maxWidth="sm">
        {!next && (
          <Box
            className="register-box"
            sx={{ bgcolor: "#cfe8fc", height: "80vh" }}
          >
            <div className="register-inputs">
              <Input
                className="register-input-email"
                inputProps={ariaLabel}
                placeholder={local.emailid}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Input
                className="register-input-password"
                inputProps={ariaLabel}
                placeholder={local.password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Input
                className="register-input-password"
                inputProps={ariaLabel}
                type="password"
                placeholder={local.confirmPassword}
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
              />

              <Button
                variant="contained"
                className="register-button"
                onClick={() => setNext(true)}
              >
                {local.next}
              </Button>
            </div>
          </Box>
        )}
        {next && (
          <Box
            className="register-box"
            sx={{ bgcolor: "#cfe8fc", height: "80vh" }}
          >
            <div className="register-inputs-next">
              <Input
                className="register-input-username"
                inputProps={ariaLabel}
                placeholder={local.username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />

              <Select
                className="register-select-user"
                options={optionsUser}
                onChange={(e) => {
                  setUserType(e.value);
                }}
              />

              <Select
                className="register-options-user"
                isMulti="true"
                options={tags}
                onChange={(e) => {
                  setUserTags([...userTags, ...e.map((ele) => ele.value)]);
                }}
              />

              <Button
                variant="contained"
                className="register-button"
                onClick={() => {
                  registerClick(
                    email,
                    password,
                    cpassword,
                    username,
                    userTags,
                    userType
                  );
                }}
              >
                {local.register}
              </Button>

              {alert.length !== 0 && (
                <div className="login-div-error">
                  <Alert severity="error" className="login-error">
                    {alert}
                  </Alert>
                </div>
              )}
            </div>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default Register;
