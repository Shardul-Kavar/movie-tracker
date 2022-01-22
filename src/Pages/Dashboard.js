import React, { useEffect, useState } from "react";
import Nav from "../CommonComponents/Nav";
import Sidebar from "../CommonComponents/Sidebar";
import Card from "@mui/material/Card";
import "./PagesStyles/Dashboard.css";
import { CardActions, CardContent } from "@mui/material";
import { useLocation, useNavigate } from "react-router";

function Dashboard() {
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  // console.log(state);
  useEffect(() => {
    getAllAdminData();
    !JSON.parse(localStorage.getItem("currentUser")).isAdmin &&
      navigate("/login");
    // console.log(!JSON.parse(localStorage.getItem("currentUser")).isAdmin);
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
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
          <CardContent className="dashboard__showUsers">
            number of Userdata : {availableUsers}
            <hr />
            <CardActions>
              <button variant="primary" onClick={() => navigate("/users")}>
                Show Userdata
              </button>
            </CardActions>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
