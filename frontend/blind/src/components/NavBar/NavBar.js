import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import InputBase from "@mui/material/InputBase";
import "./NavBar.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import Axios from "axios";
import endPointObj from "../../Config";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import strings from "../../localization";
import LocalizedStrings from 'react-localization';

NavBar.propTypes = {};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 128,
  },
}));

function NavBar(props) {

  let local = new LocalizedStrings(strings);
  const [tagName, setTagName] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createTag = async (tagName) => {
    try {
      let res = await Axios.post(endPointObj.url + "api/createTag", {
        tagName,
      });
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const redirectToPost = () => {
    navigate("/post");
  };

  const redirectToHome = () => {
    navigate("/home");
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <Input
              className="input-create"
              placeholder={local.tagName}
              onChange={(e) => {
                setTagName(e.target.value);
              }}
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal-create-button">
              <Button
                variant="contained"
                onClick={() => {
                  createTag(tagName);
                  handleClose();
                }}
              >
                {local.createTag}
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <StyledToolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: "flex-end" }}
            >
              <Button
                className="navbar-text"
                variant="text"
                onClick={() => {
                  redirectToHome();
                }}
              >
                {local.home}
              </Button>
              &nbsp;&nbsp;
              <Button
                className="navbar-text"
                variant="text"
                onClick={() => {
                  redirectToPost();
                }}
              >
                {local.post}
              </Button>
            </Typography>
            <Tooltip title="Create Tag">
              <div>
                <i
                  class="fa-solid fa-plus fa-xl nav-create-tag"
                  onClick={() => {
                    handleOpen();
                  }}
                ></i>
              </div>
            </Tooltip>
            &nbsp;
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={handleMenu}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={()=>{navigate("/profile")}}>{local.profile}</MenuItem>
              <MenuItem onClick={()=>{navigate("/login")}}>{local.logout}</MenuItem>
            </Menu>
          </StyledToolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default NavBar;
