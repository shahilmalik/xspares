import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { properties } from "@/style/styles";

function CustomSelectField({ label, width, data, disabled, selectedData }) {
  const prop = properties();

  const handleChange = (event, newValue) => {
    selectedData(newValue);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        options={data}
        disabled={disabled}
        onChange={handleChange}
        getOptionLabel={(item) => item}
        renderOption={(props, item) => {
          const { key, ...restProps } = props; // Destructure and separate key from other props
          return (
            <li key={item} {...restProps}>
              {" "}
              {/* Directly set the key prop */}
              {item} {/* Show both title and year in the dropdown */}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            sx={{
              color: "black",
              width: { width },
              "& label": {
                color: "black", // default label color
              },
              "& label.Mui-focused": {
                color: "black", // Change label color when field is focused
              },
              borderRadius: "12px", // Adjust border radius here
              "& .MuiOutlinedInput-root": {
                borderRadius: prop.borderRadius.twelve, // Ensuring the border-radius is applied to the input field
                // '& fieldset': {
                //   borderColor: 'grey', // default border color
                // },
                // '&:hover fieldset': {
                //   borderColor: 'white', // border color on hover
                // },
                "&.Mui-focused fieldset": {
                  borderColor: "black", // border color when focused
                },
              },
            }}
          />
        )}
      />
    </div>
  );
}

export default CustomSelectField;
