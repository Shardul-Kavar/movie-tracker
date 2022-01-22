import React, { useEffect, useState } from "react";
import Nav from "../CommonComponents/Nav";
import Sidebar from "../CommonComponents/Sidebar";
import Card from "@mui/material/Card";
import "./PagesStyles/Dashboard.css";
import { Button, CardActions, CardContent } from "@mui/material";
import { useNavigate } from "react-router";

function Dashboard() {
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getAllAdminData();
    !localStorage.getItem("currentUser")
      ? navigate("/login")
      : setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  function getAllAdminData() {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((result) => setAdminData(result))
      .catch(console.log);
  }

  const availableUsers = adminData.length;

  return (
    <div className="dashboard">
      <Nav currentUser={currentUser} />
      <div className="dashboard__container">
        <Sidebar currentUser={currentUser} />
        <Card className="dashboard__content">
          {currentUser.isAdmin ? (
            <CardContent className="dashboard__showUsers">
              number of Userdata : {availableUsers}
              <hr />
              <CardActions>
                <button variant="primary" onClick={() => navigate("/users")}>
                  Show Userdata
                </button>
              </CardActions>
            </CardContent>
          ) : (
            <CardContent className="dashboard__showUsers">
              Movies in Watchlist :
              <hr />
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => navigate("/watchlist")}
                >
                  my watchlist
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/movieslist")}
                >
                  movies list
                </Button>
              </CardActions>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
