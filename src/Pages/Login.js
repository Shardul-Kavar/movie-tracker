import React, { useEffect, useState } from "react";
import "./PagesStyles/Login.css";
import Nav from "../CommonComponents/Nav";
import { useNavigate } from "react-router";
import { NewCorrectionError, NewError } from "../CommonComponents/ErrorMessage";
import { Button, TextField } from "@mui/material";

function Login() {
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();
  const [errorCheck, setErrorCheck] = useState(false);
  const [tempAdmin, setTempAdmin] = useState({ username: "", password: "" });
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getAllAdminData();
  }, []);

  function getAllAdminData() {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((result) => setAdminData(result))
      .catch(console.log);
  }

  useEffect(() => {
    currentUser.id && (currentUser.isAdmin ? navigate("/dashboard", { state: currentUser }) : navigate("/mydashboard", { state: currentUser }));
    currentUser.id && localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  function loginSuccessfull(e) {
    if (e.isBlocked === true) {
      window.alert("You are Blocked!");
    } else setCurrentUser(e);
    // navigate("/dashboard", { state: currentUser });
  }

  function handleSubmit(e) {
    e.preventDefault();
    adminData.map((e) => {
      return e.username + e.password === tempAdmin.username + tempAdmin.password ? loginSuccessfull(e) : setErrorCheck(true);
      // localStorage.setItem("adminKey", [JSON.stringify(e.key)]);
    });

    // localStorage.getItem("adminKey") && navigate("/dashboard");
  }

  return (
    <div>
      <Nav />
      <form noValidate className="login" onSubmit={(e) => handleSubmit(e)}>
        <div className="login__card">
          <h3>Log In</h3>
          <div className="mb-3" controlId="formBasicUsername">
            <h4>Username</h4>
            <TextField
              size="small"
              type="text"
              placeholder="Enter Your Username"
              onChange={(e) => setTempAdmin({ ...tempAdmin, username: e.target.value })}
              onBlur={() => setErrorCheck(false)}
              required
            />
            {tempAdmin.username.length === 0
              ? errorCheck && <NewError error={true} name="Username" />
              : errorCheck && <NewCorrectionError error={true} name="username" />}
          </div>

          <div className="mb-3" controlId="formBasicPassword">
            <h4>Password</h4>
            <TextField
              size="small"
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => setTempAdmin({ ...tempAdmin, password: e.target.value })}
              onBlur={() => setErrorCheck(false)}
              required
            />
            {tempAdmin.password.length === 0
              ? errorCheck && <NewError error={true} name="Password" />
              : errorCheck && <NewCorrectionError error={true} name="password" />}
          </div>
          {/* <Form.Group className="mb-3" controlId="formBasicCheckbox" required>
            <Form.Check type="checkbox" label="I want to Login" />
          </Form.Group> */}
          <Button variant="contained" style={{ marginTop: "20px" }} type="submit" onMouseOver={() => setErrorCheck(false)}>
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;

// --------------------------------------------------------------------------------------------------------------
