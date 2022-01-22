import React, { useEffect, useState } from "react";
import "../PagesStyles/UserDashboard.css";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import Nav from "../../CommonComponents/Nav";
import Sidebar from "../../CommonComponents/Sidebar";
import Card from "@mui/material/Card";
import "../PagesStyles/Dashboard.css";
import { CardActions, CardContent } from "@mui/material";

function UserDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  
  useEffect(() => {
    !JSON.parse(localStorage.getItem("currentUser")) && navigate("/login");
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <div className="myDashboard">
      {/* <div className="App" style={{ border: "1px solid black", margin: "10px" }}> */}
      <div className="dashboard">
        <Nav currentUser={currentUser} />
        <div className="dashboard__container">
          <Sidebar currentUser={currentUser} />
          <Card className="dashboard__content">
            <CardContent className="dashboard__showUsers">
              Movies in Watchlist :
              <hr />
              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => navigate("/mywatchlist")}
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
          </Card>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
