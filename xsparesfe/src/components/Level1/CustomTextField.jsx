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
  id,

}) {
  const prop = properties();
  const [isInValidEmail, setIsInValidEmail] = useState(true); //will check if it is a valid email

  // Run validation logic only when value changes
  useEffect(() => {
    if (validateEmail && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsInValidEmail(!emailRegex.test(value)); // Set error to true if email is invalid
    } else {
      setIsInValidEmail(false); // Reset the error if the field is empty
    }
  }, [value, validateEmail]);

  return (
    <div>
      <TextField
        id={id}
        label={label || "label"}
        variant="outlined"
        type={type}
        value={value}
        onChange={onChange}
        error={isInValidEmail}
        helperText={isInValidEmail ? "Please enter a valid email address" : ""}
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
