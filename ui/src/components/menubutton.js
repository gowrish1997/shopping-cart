import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Confirmlogout from "./Confirmlogout";
import { useractions } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import {
  AccountBoxOutlined,
  ArrowDropDownCircleOutlined,
  FavoriteBorderOutlined,
  ListOutlined,
 
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MenuList } from "@material-ui/core";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    width: "200px",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Menubutton() {
  const [show, setshow] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout_handler = () => {
    dispatch(useractions.logout());
  };
  const Logoutmodel_handler = () => {
    setshow((prev) => {
      return !prev;
    });
  };
  return (
    <div>
      {show && <Confirmlogout handler={Logoutmodel_handler}></Confirmlogout>}
      {window.innerWidth > 400 ? (
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          style={{ backgroundColor: "teal" }}
        >
          My account<ArrowDropDownCircleOutlined></ArrowDropDownCircleOutlined>
        </Button>
      ) : (
        <ListOutlined  aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ color: "teal",width:"40px",height:"40px" }}
         ></ListOutlined>
      
      )}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          style={{ textDecoration: "none",color:"none"}}
          to="/account/Order"
        >
          <StyledMenuItem>
            <ListItemText primary="My orders" />
          </StyledMenuItem>
        </Link>
        <StyledMenuItem onClick={Logoutmodel_handler}>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
        <Link
          style={{ textDecoration: "none" }}
          to="/account/userprofile"
        >
          <StyledMenuItem>
            <AccountBoxOutlined></AccountBoxOutlined>
            <ListItemText primary="My profile" />
          </StyledMenuItem>
        </Link>
        <Link
          style={{ textDecoration: "none" }}
          to="/account/wishlist"
        >
          <StyledMenuItem>
            <FavoriteBorderOutlined></FavoriteBorderOutlined>
            <ListItemText primary="Wish list" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
