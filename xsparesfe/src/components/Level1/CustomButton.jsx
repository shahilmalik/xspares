import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

function CustomButton({
  children,
  variant,
  startIcon,
  endIcon,
  sx,
  fontSize,
  ...props
}) {
  return (
    <div>
      <Button variant={variant} sx={{ ...sx, height: "100%" }} {...props}>
        {startIcon && <span style={{ marginRight: 0 }}>{startIcon}</span>}
        <Typography
          sx={{
            textTransform: "none",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { fontSize },
          }}
        >
          {children}
        </Typography>
        {endIcon && <span style={{ marginLeft: 8 }}>{endIcon}</span>}
      </Button>
    </div>
  );
}

export default CustomButton;
