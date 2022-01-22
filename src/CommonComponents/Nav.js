import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function Nav(props) {
  const settings =
    window.location.toString().slice(22) === "signup"
      ? ["Log in"]
      : window.location.toString().slice(22) === "login"
      ? ["Sign Up"]
      : [
          props.currentUser && `Signed in as : ${props.currentUser.username}`,
          "Dashboard",
          "Logout",
        ];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    if (event.target.innerText === "Logout") {
      localStorage.clear();
      navigate("/login");
    } else if (event.target.innerText === "Log in") {
      navigate("/login");
    } else if (event.target.innerText === "Dashboard") {
      navigate("/");
    } else if (event.target.innerText === "Sign Up") {
      navigate("/signup");
    } else {
      console.log(event.target.innerText);
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" }, flex: 1 }}
          >
            Watchlist Tracker
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Movie Tracker
          </Typography>

          <Box sx={{ right: 1 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                style={{ scale: "1.4" }}
              >
                {!!props.currentUser ? (
                  props.currentUser.isAdmin ? (
                    <AdminPanelSettingsIcon />
                  ) : (
                    <PersonIcon />
                  )
                ) : (
                  <PersonIcon />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => handleCloseNavMenu(e)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
