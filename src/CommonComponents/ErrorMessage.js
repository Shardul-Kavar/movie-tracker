import React from "react";
import "./CCstyles/ErrorMessage.css";

export function ErrorMessage({ validated, name }) {
  return (
    <p style={{ color: "red", opacity: "0.6" }}>Please Enter Your {name}</p>
  );
}

export function CorrectionErrorMessage({ validated, name }) {
  return (
    <p className={validated ? "errorMessage" : "successMessage"}>
      Please Enter Correct {name}
    </p>
  );
}

export function SelectErrorMessage({ validated, name }) {
  return (
    <p className={validated ? "errorMessage" : "successMessage"}>
      Please Select {name}
    </p>
  );
}

export function PhoneNumberLengthErrorMessage({ mobile }) {
  if (mobile.length < 10) {
    return (
      <p style={{ color: "red", opacity: "0.6" }}>
        Phone Number can not be less then 10 digits
      </p>
    );
  } else if (mobile.length === 10) {
    return <p>we'll never share your details with anyone</p>;
  } else {
    return (
      <p style={{ color: "red", opacity: "0.6" }}>
        Phone Number must not exceed more then 10 digits
      </p>
    );
  }
}

export function NewError({ error, name }) {
  return (
    error && (
      <p style={{ color: "red", opacity: "0.6" }}>please Enter Your {name}</p>
    )
  );
}

export function NewSelectError({ error, name }) {
  return (
    error && (
      <p style={{ color: "red", opacity: "0.6" }}>please Select Your {name}</p>
    )
  );
}

export function NewCorrectionError({ error, name }) {
  return (
    error && (
      <p style={{ color: "red", opacity: "0.6" }}>
        please Enter Correct {name}
      </p>
    )
  );
}

export function PasswordMustMatch({ error, name }) {
  return (
    error && (
      <p style={{ color: "red", opacity: "0.6" }}>
        both {name} must be identical!
      </p>
    )
  );
}
