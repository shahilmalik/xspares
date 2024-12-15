"use client";
import React from "react";
import CustomTextField from "../Level1/CustomTextField";
import CustomButton from "../Level1/CustomButton";
import { properties } from "@/style/styles";
import { Box, Modal } from "@mui/material";

function LoginComponent({ openLogin, setOpenLogin }) {
  const prop = properties();
  const handleClose = () => {
    setOpenLogin(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    pt: 2,
    px: 4,
    pb: 3,
  };
  return (
    <>
      <Modal
        open={openLogin}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style,  }}>
          {" "}
          <div className="bg-[#f8f8f8] rounded-xl w-[35rem] p-10 flex flex-col justify-center items-start border-2 border-black drop-shadow-xl">
            <p
              className="flex mb-5 items-start"
              style={{
                fontSize: prop.fontSize.sixteen,
                fontWeight: prop.fontWeight.semiBold,
              }}
            >
              Enter your Email address to proceed with the registration.
            </p>
            <div className="flex flex-col gap-y-5 ">
              <div>
                <CustomTextField width={"30rem"} label="Email Address" />
              </div>
              <div className="flex items-center justify-center">
                <CustomButton
                  variant="contained"
                  sx={{
                    backgroundColor: "#161616",
                    borderRadius: prop.borderRadius.eight,
                  }}
                >
                  Continue
                </CustomButton>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default LoginComponent;
