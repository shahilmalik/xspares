"use client";
import React, { useEffect, useState } from "react";
import CustomTextField from "../Level1/CustomTextField";
import CustomButton from "../Level1/CustomButton";
import { properties } from "@/style/styles";
import { Box, Modal } from "@mui/material";
import OtpFields from "../Level1/OtpFields";

function LoginComponent({ openLogin, setOpenLogin }) {
  const prop = properties();
  const [emailData, setEmailData] = useState(""); // Track email input
  const [passwordData, setPasswordData] = useState(""); //Typed Password data
  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false); // Control expansion of the form
  const [isOtpExpanded, setIsOtpExpanded] = useState(false); //state to expand OTP field
  const [sendOtp, setSendOtp] = useState();
  const [isInValidEmail, setIsInValidEmail] = useState(true); //will check if it is a valid email
  const [otpData, setOtpData] = useState(); //OTP's 6 digit data
  const [counter, setCounter] = useState({ login: 0, signup: 0 }); //Coutner for login and signup clicks
  const handleEmail = (e) => {
    setEmailData(e.target.value);
  };
  const handlePassword = (e) => {
    setPasswordData(e.target.value);
  };
  console.log("##emailData", emailData);
  console.log("##isValidEmail", isInValidEmail);
  const handleClose = () => {
    setIsPasswordExpanded(false);
    setEmailData("");
    setIsOtpExpanded(false);
    setSendOtp(false);
    setCounter({ login: 0, signup: 0 });
    setOpenLogin(false);
  };
  console.log("counter:", counter);
  const handleLogIn = () => {
    setIsPasswordExpanded(true);
    setCounter((prev) => ({ ...prev, login: prev.login + 1 }));
  };
  const handleSignUp = () => {
    setSendOtp(true);
    setCounter((prev) => ({ ...prev, signup: prev.signup + 1 }));
  };

  const handleSendOtp = () => {
    setIsPasswordExpanded(false);
    setIsOtpExpanded(true);
  };

  useEffect(() => {
    if (counter.login > 1) {
      console.log("API CALL");
    }
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "black",
    // border: "none",
    borderRadius: prop.borderRadius.fifteen,
  };

  return (
    <>
      <Modal
        open={openLogin}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <div className="bg-[#f8f8f8] rounded-xl w-[35rem] p-10 flex flex-col justify-center items-start border-2 border-black drop-shadow-2xl h-auto">
            <p
              className="flex mb-5 items-start"
              style={{
                fontSize: prop.fontSize.sixteen,
                fontWeight: prop.fontWeight.semiBold,
              }}
            >
              Enter your Email address to proceed with login or registration.
            </p>

            <div className="flex flex-col gap-y-2">
              <div className="">
                <CustomTextField
                  width={"30rem"}
                  label="Email Address"
                  validateEmail={true}
                  onChange={handleEmail}
                  type="email"
                  value={emailData}
                  setIsInValidEmail={setIsInValidEmail}
                  isInValidEmail={isInValidEmail}
                />
              </div>
              {isPasswordExpanded ? (
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out pt-2 ${
                    isPasswordExpanded ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div>
                    <CustomTextField
                      width={"30rem"}
                      label="Password"
                      onChange={handlePassword}
                      type="password"
                      value={passwordData}
                    />
                  </div>
                </div>
              ) : null}
              {isOtpExpanded ? (
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out pt-2 mb-2 ${
                    isOtpExpanded ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div className="">
                    <OtpFields setOtpData={setOtpData} />
                  </div>
                  <p
                    style={{
                      fontSize: prop.fontSize.twelve,
                      marginLeft: "2px",
                    }}
                  >
                    Please Enter the OTP in the above boxes
                  </p>
                </div>
              ) : null}

              <div className="flex items-center justify-center gap-x-2 h-[3rem] mt-2 ">
                {!sendOtp && (
                  <div
                    className={`h-[100%] ${
                      isPasswordExpanded ? "w-[100%]" : "w-[100%]"
                    }`}
                  >
                    <CustomButton
                      variant="contained"
                      disabled={isInValidEmail ? true : false}
                      sx={{
                        backgroundColor: "#161616",
                        borderRadius: prop.borderRadius.eight,
                      }}
                      onClick={handleLogIn}
                    >
                      Login
                    </CustomButton>
                  </div>
                )}

                <div
                  className={`h-[100%] ${
                    isPasswordExpanded ? "w-[0%]" : "w-[100%]"
                  }`}
                >
                  {!isPasswordExpanded && !sendOtp && (
                    <CustomButton
                      variant="contained"
                      disabled={isInValidEmail ? true : false}
                      sx={{
                        backgroundColor: "#161616",
                        borderRadius: prop.borderRadius.eight,
                      }}
                      onClick={handleSignUp}
                    >
                      SignUp
                    </CustomButton>
                  )}
                  {sendOtp && !isPasswordExpanded && (
                    <CustomButton
                      variant="contained"
                      disabled={isInValidEmail ? true : false}
                      sx={{
                        backgroundColor: "#161616",
                        borderRadius: prop.borderRadius.eight,
                      }}
                      onClick={handleSendOtp}
                    >
                      Get OTP
                    </CustomButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default LoginComponent;
