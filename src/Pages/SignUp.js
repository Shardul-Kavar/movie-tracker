import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import Footer from "../CommonComponents/Footer";
import "./PagesStyles/SignUp.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Nav from "../CommonComponents/Nav";
import {
  NewCorrectionError,
  NewError,
  ErrorMessage,
  PhoneNumberLengthErrorMessage,
} from "../CommonComponents/ErrorMessage";

function SignUp() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    key: uuidv4(),
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    isAdmin: false,
  });
  const [usernameErrorCheck, setUsernameErrorCheck] = useState(false);
  const [errorCheck, setErrorCheck] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [tempPassword, setTempPassword] = useState("");
  const [tempPassword2, setTempPassword2] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [emailCheck, setEmailCheck] = useState(false);

  useEffect(() => {
    getAllAdminData();
  }, []);

  function getAllAdminData() {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((result) => setAdminData(result))
      .catch(console.log);
  }

  function checkPassword(e) {
    if (tempPassword.length === 0 || tempPassword2.length === 0) {
      return (
        setErrorCheck(true),
        setPasswordErrorMessage("Password field can not be empty!")
      );
    } else if (tempPassword !== tempPassword2) {
      return (
        setErrorCheck(true),
        setPasswordErrorMessage("Both passwords must match")
      );
    } else {
      checkPasswordStrength();
    }
  }

  function checkPasswordStrength() {
    errorCheck &&
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/.test(tempPassword2)
      ? setErrorCheck(false)
      : setPasswordErrorMessage("password is too weak");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    checkPassword();
    setUsernameErrorCheck(true);
    checked &&
      fetch("http://localhost:3001/users", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(admin),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <div className="signup">
      <div className="signup__nav">
        <Nav />
      </div>
      <form
        noValidate
        className="signup__form"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h1 style={{ margin: "0px" }}>Sign Up</h1>
        <div className="signup__card">
          <div>
            <h5>Name</h5>
            <TextField
              size="small"
              className="signup__textfield"
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => {
                setAdmin({ ...admin, name: e.target.value });
              }}
              required
            />
            {checked && (
              <NewError error={admin.name.length === 0} name="Name" />
            )}
          </div>
          <div>
            <h5>E-mail</h5>
            <TextField
              size="small"
              className="signup__textfield"
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => {
                setAdmin({ ...admin, email: e.target.value });
              }}
              onBlur={(e) =>
                /^([a-zA-Z0-9]+\.)[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
                  admin.email
                )
                  ? setEmailCheck(false)
                  : setEmailCheck(true)
              }
              required
            />
            {checked
              ? admin.email.length === 0 && (
                  <NewError
                    error={admin.email.length === 0}
                    name="email address"
                  />
                )
              : emailCheck && (
                  <NewCorrectionError error={true} name="email address" />
                )}
          </div>
          <div>
            <h5>Conatact Number</h5>
            <TextField
              size="small"
              className="signup__textfield"
              type="number"
              placeholder="Enter Your Mobile Number"
              onChange={(e) => {
                setAdmin({ ...admin, mobile: e.target.value });
              }}
              required
            />
            {checked
              ? admin.mobile.length === 0 && (
                  <ErrorMessage validated={true} name="Contact Number" />
                )
              : admin.mobile.length !== 0 && (
                  <PhoneNumberLengthErrorMessage mobile={admin.mobile} />
                )}
            <p style={{ fontSize: "0.6rem", opacity: "0.6" }}>
              We'll never share your details anyone else.
            </p>
          </div>
          <div className="mb-3" controlId="formBasicUsername">
            <h5>Username</h5>
            <TextField
              size="small"
              className="signup__textfield"
              type="text"
              placeholder="Enter username"
              onChange={(e) => {
                setAdmin({ ...admin, username: e.target.value });
              }}
              onBlur={() => setUsernameErrorCheck(true)}
              required
            />

            {admin.username.length === 0 && usernameErrorCheck && (
              <p style={{ color: "red", opacity: "0.6" }}>
                Username field can not be empty!
              </p>
            )}
          </div>

          <div className="mb-3" controlId="formBasicPassword">
            <h3>Password</h3>
            <TextField
              size="small"
              className="signup__textfield"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setTempPassword(e.target.value);
              }}
              required
            />
            <br />
            <p>Repeat Password</p>
            <TextField
              size="small"
              className="signup__textfield"
              type="password"
              placeholder="Please Enter the same Password"
              onChange={(e) => setTempPassword2(e.target.value)}
              onBlur={(e) => checkPassword(e)}
              required
            />
            {errorCheck && (
              <p style={{ color: "red", opacity: "0.6" }}>
                {passwordErrorMessage}
              </p>
            )}
          </div>
          <div className="mb-3" controlId="formBasicCheckbox">
            <input
              type="checkbox"
              label="I accept the terms and conditions*"
              onChange={() =>
                !errorCheck
                  ? (setAdmin({ ...admin, password: tempPassword }),
                    checked ? setChecked(false) : setChecked(true))
                  : (admin, setChecked(true))
              }
              checked={checked}
              disabled={admin.username.length === 0 || admin.password === 0}
              required
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            // onClick={(e) => handleSubmit(e)}
            disabled={errorCheck || !checked}
          >
            Sign Up
          </Button>
        </div>
      </form>

      <div
        style={{ position: "fixed", bottom: "0" }}
        onClick={() => console.log(adminData)}
      >
        <Footer />
      </div>
    </div>
  );
}

export default SignUp;
