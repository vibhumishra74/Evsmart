import React from "react";
import { Link } from "react-router-dom";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core";
// import Link from '@material-ui/core/Link';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Profile from "@material-ui/icons/PersonOutline";
import Help from "@material-ui/icons/HelpOutline";
import EvStationIcon from "@material-ui/icons/EvStation";
import AddLocationIcon from '@material-ui/icons/AddLocation';
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import DashboardIcon from "@material-ui/icons/Dashboard";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
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

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <ListItemIcon>
          <MenuOpenIcon fontSize="small" style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Open Menu" />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={"./profile"}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <Profile fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </StyledMenuItem>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to={"./help"}>
          <StyledMenuItem>
            <ListItemIcon>
              <Help fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </StyledMenuItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={"./station"}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <EvStationIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Add Station" />
          </StyledMenuItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={"./station-profile"}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <AddLocationIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Station Profile" />
          </StyledMenuItem>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={"./dashboard"}
        >
          <StyledMenuItem>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
