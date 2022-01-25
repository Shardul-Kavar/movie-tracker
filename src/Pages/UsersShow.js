import React, { useEffect, useState } from "react";
// import { Button,  Dropdown, DropdownButton } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import Card from "@mui/material/Card";
import Nav from "../CommonComponents/Nav";
// import Footer from "./CommonComponents/Footer";
import Sidebar from "../CommonComponents/Sidebar";
// import UsersTable from "./UsersTable";
import UsersTable from "./UsersTable2copy";
import "./PagesStyles/UsersShow.css";

function UsersShow() {
  // const [currentView, setCurrentView] = useState("table");
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    !localStorage.getItem("currentUser")
      ? navigate("/login")
      : !JSON.parse(localStorage.getItem("currentUser")).isAdmin
      ? navigate("/login")
      : setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <div className="utable">
      <>
        <Nav currentUser={currentUser} />
        <div className="utable__container">
          <Sidebar className="utable__sidebar" currentUser={currentUser} />
          <Card className="utable__content">
            <div className="utable__buttons">
              {/* <Button variant="primary" onClick={() => navigate("/form")}>
                add user
              </Button> */}
              {/* <DropdownButton
                align="end"
                id="dropdown-item-button"
                title="view"
              >
                <Dropdown.Item onClick={() => setCurrentView("grid")}>
                  Grid-layout
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setCurrentView("table")}>
                  Table-layout
                </Dropdown.Item>
              </DropdownButton> */}
            </div>
            <div className="utable__showUsers">
              {/* {currentView === "table" ? <UsersTable /> : <UsersGrid />} */}
              <UsersTable />
            </div>
          </Card>
        </div>
        {/* <Footer /> */}
      </>
      {/* )} */}
    </div>
  );
}

export default UsersShow;
