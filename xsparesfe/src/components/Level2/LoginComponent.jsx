"use client";
import React, { useEffect, useState } from "react";
import CustomTextField from "../Level1/CustomTextField";
import CustomButton from "../Level1/CustomButton";
import { properties } from "@/style/styles";
import { Box, Modal } from "@mui/material";
import OtpFields from "../Level1/OtpFields";
import axios from "axios";

function LoginComponent({ openLogin, setOpenLogin }) {
  const prop = properties();
  const [data, setData] = useState(); //Post call Email
  const [otpResponse, setOtpResponse] = useState();
  const [postOTP, setPostOTP] = useState({ email: "", otp: "" });
  const [loading, setLoading] = useState();
  const [emailData, setEmailData] = useState({ email: "" }); // Track email input
  const [passwordData, setPasswordData] = useState(""); //Typed Password data
  const [loginCompControl, setLoginCompControl] = useState({
    login: 0,
    signup: 0,
  });
  const [isInValidEmail, setIsInValidEmail] = useState(true); //will check if it is a valid email
  const [otpData, setOtpData] = useState(); //OTP's 6 digit data

  const handleEmail = (e) => {
    setEmailData((prev) => ({ ...prev, email: e.target.value }));
  };
  const handlePassword = (e) => {
    setPasswordData(e.target.value);
  };
  const handleClose = () => {
    setLoginCompControl({ login: 0, signup: 0 });
    // setEmailData("");
    setOpenLogin(false);
  };
  const handleLogIn = () => {
    if (loginCompControl.login >= 0 && loginCompControl.login <= 2) {
      setLoginCompControl((prev) => ({ ...prev, login: prev.login + 1 }));
    }
  };
  const handleSignUp = () => {
    if (loginCompControl.signup >= 0 && loginCompControl.signup <= 3)
      setLoginCompControl((prev) => ({ ...prev, signup: prev.signup + 1 }));
  };
  useEffect(() => {
    if (loginCompControl.login === 1) {
    } else if (loginCompControl.login === 2) {
    }
  }, [loginCompControl.login]);
  useEffect(() => {
    if (loginCompControl.signup === 1) {
    } else if (loginCompControl.signup === 2) {
    } else if (loginCompControl.signup === 3) {
    }
  }, [loginCompControl.signup]);

  useEffect(() => {
    if (loginCompControl.signup === 2) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            "http://localhost:8000/api/send-otp/",
            emailData
          );
          setData(response.data);
        } catch (error) {
          console.error("Error posting data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [loginCompControl.signup]);

  useEffect(() => {
    if (emailData.email && otpData) {
      setPostOTP((prev) => ({ ...prev, email: emailData.email, otp: otpData }));
    }
  }, [otpData]);

  useEffect(() => {
    if (loginCompControl.signup === 3) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            "http://localhost:8000/api/verify-otp/",
            postOTP
          );
          setOtpResponse(response.data);
        } catch (error) {
          console.error("Error posting data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [loginCompControl.signup]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
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
              className="flex mb-8 items-start"
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
                  value={emailData.email}
                  setIsInValidEmail={setIsInValidEmail}
                  isInValidEmail={isInValidEmail}
                  id="email-Field"
                />
              </div>
              {/* Password expansion Area */}
              {loginCompControl.login >= 1 ? (
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out pt-2 ${
                    loginCompControl.login >= 1 ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <div>
                    <CustomTextField
                      width={"30rem"}
                      label="Password"
                      onChange={handlePassword}
                      type="password"
                      value={passwordData}
                      id="Password-Field"
                    />
                  </div>
                </div>
              ) : null}

              {/* OTP expansion area */}
              {loginCompControl.signup >= 2 ? (
                <div
                  className={`overflow-hidden transition-all duration-700 ease-in-out pt-2 mb-2 ${
                    loginCompControl.signup >= 2 ? "max-h-[500px]" : "max-h-0"
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

              {/* Login Button */}
              <div className="flex items-center justify-center gap-x-2 h-[3rem] mt-2 ">
                {loginCompControl.login >= 0 &&
                  !loginCompControl.signup >= 1 && (
                    <div className={`h-[100%] w-[100%]`}>
                      <CustomButton
                        variant="contained"
                        disabled={emailData.email === "" ? true : false}
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

                {/* SignUp button */}
                {!loginCompControl.login >= 1 && (
                  <div className="h-[100%] w-[100%]">
                    {loginCompControl.signup >= 0 &&
                      !loginCompControl.login >= 1 && (
                        <CustomButton
                          variant="contained"
                          disabled={emailData.email === "" ? true : false}
                          sx={{
                            backgroundColor: "#161616",
                            borderRadius: prop.borderRadius.eight,
                          }}
                          onClick={handleSignUp}
                        >
                          {loginCompControl.signup === 0
                            ? "SignUp"
                            : loginCompControl.signup === 1
                            ? "Get OTP"
                            : loginCompControl.signup === 2
                            ? "Verify"
                            : "Verify"}
                        </CustomButton>
                      )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default LoginComponent;
