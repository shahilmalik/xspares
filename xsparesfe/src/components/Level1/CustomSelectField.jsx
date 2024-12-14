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
        getOptionLabel={(item) => item.option}
        renderOption={(props, item) => {
          const { key, ...restProps } = props; // Destructure and separate key from other props
          return (
            <li key={item.option} {...restProps}> {/* Directly set the key prop */}
              {item.option} {/* Show both title and year in the dropdown */}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            sx={{
              width: { width },
              borderRadius: "12px", // Adjust border radius here
              "& .MuiOutlinedInput-root": {
                borderRadius: prop.borderRadius.xl2, // Ensuring the border-radius is applied to the input field
              },
            }}
          />
        )}
      />
    </div>
  );
}

export default CustomSelectField;
