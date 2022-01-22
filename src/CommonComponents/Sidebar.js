import React from "react";
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

  return (
    <div className="sidebar">
      <Table bordered hover>
        <TableBody>
          <TableRow>
            <TableCell
              onClick={() => navigate("/")}
              id="Dashboard"
              className={
                window.location.href.slice(22) === "" && "sidebar__link__active"
              }
            >
              Dashboard
            </TableCell>
          </TableRow>
          {props.currentUser.isAdmin ? (
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
          ) : (
            <>
              <TableRow>
                <TableCell
                  onClick={(e) => goTo(e)}
                  id="watchlist"
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
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Sidebar;
