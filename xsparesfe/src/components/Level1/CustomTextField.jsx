import { TextField } from "@mui/material";
import React from "react";
import { properties } from "@/style/styles";
function CustomTextField({ width, label }) {
  const prop = properties();
  return (
    <div>
      <TextField
        id="outlined-basic"
        label={label || "label"}
        variant="outlined"
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
