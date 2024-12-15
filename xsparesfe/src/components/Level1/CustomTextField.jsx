"use client";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { properties } from "@/style/styles";

function CustomTextField({
  width,
  label,
  onChange,
  validateEmail = false,
  value,
  type = "text",
  isInValidEmail,
  setIsInValidEmail,
}) {
  const prop = properties();
  // const [error, setError] = useState(false); // Track error state
  // const [isInValidEmail, setIsInValidEmail] = useState(true); //will check if it is a valid email

  // Run validation logic only when value changes
  useEffect(() => {
    if (validateEmail && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
      setIsInValidEmail(!emailRegex.test(value)); // Set error to true if email is invalid
    } else {
      setIsInValidEmail(false); // Reset the error if the field is empty
    }
  }, [value, validateEmail]); // Run whenever value or validateEmail changes

  return (
    <div>
      <TextField
        id="outlined-basic"
        label={label || "label"}
        variant="outlined"
        type={type}
        value={value} // Controlled input value
        onChange={onChange} // Calls parent handler
        error={isInValidEmail} // Triggers MUI error state
        helperText={isInValidEmail ? "Please enter a valid email address" : ""} // Shows validation error
        sx={{
          width: width || "25%",
          "& label": {
            color: "black", // default label color
          },
          "& label.Mui-focused": {
            color: "black", // Change label color when field is focused
          },
          "& .MuiOutlinedInput-root": {
            borderRadius: prop.borderRadius.ten,
            "&.Mui-focused fieldset": {
              borderColor: "black", // border color when focused
            },
          },
        }}
      />
    </div>
  );
}

export default CustomTextField;
