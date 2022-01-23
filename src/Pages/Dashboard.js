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
  const [watchlistLength, setWatchlistLength] = useState(0);

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
  useEffect(() => {
    fetch(`http://localhost:3001/watchlist/?userid=${currentUser.id}`)
      .then((response) => response.json())
      .then((data) => setWatchlistLength(data.length));
  }, [currentUser]);

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
              <hr className="dashboard__hr" />
              <CardActions>
                <Button variant="contained" onClick={() => navigate("/users")}>
                  Show Userdata
                </Button>
              </CardActions>
            </CardContent>
          ) : (
            <CardContent className="dashboard__showUsers">
              Movies in Watchlist : {watchlistLength}
              <hr className="dashboard__hr" />
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
