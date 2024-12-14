import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import { properties } from "@/style/styles";
import { fontStyle } from "@/style/fontStyle";
function CustomButton({
  children,
  variant,
  startIcon,
  endIcon,
  sx,
  fontSize,
  ...props
}) {
  const style = fontStyle();
  const prop = properties();
  return (
    <div>
      <Button variant={variant} sx={{ height: "100%", ...sx }} {...props}>
        {startIcon && <span style={{ marginRight: 0 }}>{startIcon}</span>}
        <Typography
          sx={{
            textTransform: "none",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            ...style.b4
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
