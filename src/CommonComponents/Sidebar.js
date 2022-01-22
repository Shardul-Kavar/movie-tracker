import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./CCstyles/Sidebar.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function Sidebar(props) {
  const navigate = useNavigate();
  function goTo(e) {
    navigate(`/${e.target.id}`);
  }
  // const sidebarOptions = props.currentUser.isAdmin ? ['dashboard', 'users'] : ['my dashboard', 'my watchlist', 'movies list']
  // console.log(props.currentUser.isAdmin);
  return (
    <div className="sidebar">
      <Table bordered hover>
        {props.currentUser.isAdmin ? (
          <TableBody>
            <TableRow>
              <TableCell
                onClick={(e) => goTo(e)}
                id="dashboard"
                // className="sidebar__link"
                className={
                  window.location.href.slice(22) === "dashboard" &&
                  "sidebar__link__active"
                }
              >
                Dashboard
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                onClick={(e) => goTo(e)}
                id="users"
                className={
                  window.location.href.slice(22) === "users" &&
                  "sidebar__link__active"
                }
              >
                Users
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell
                onClick={(e) => goTo(e)}
                id="mydashboard"
                // className="sidebar__link"
                className={
                  window.location.href.slice(22) === "mydashboard" &&
                  "sidebar__link__active"
                }
              >
                Dashboard
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                onClick={(e) => goTo(e)}
                id="mywatchlist"
                className={
                  window.location.href.slice(22) === "watchlist" &&
                  "sidebar__link__active"
                }
              >
                Watchlist
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                onClick={(e) => goTo(e)}
                id="movieslist"
                className={
                  window.location.href.slice(22) === "movieslist" &&
                  "sidebar__link__active"
                }
              >
                Movies
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default Sidebar;
