"use client";
import React, { useState } from "react";
import SearchField from "../Level1/SearchField";
import CustomButton from "../Level1/CustomButton";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginComponent from "./LoginComponent";

function TopNavbar() {
  const [openLogin, setOpenLogin] = useState(false);
  const handleOpen = () => {
    setOpenLogin(true);
  };  
  return (
    <div className="p-1 bg-[#0f212b]">
      <div className="flex justify-between items-center h-[6vh] w-full">
        <div className="flex basis-3/5 justify-start gap-x-6 ">
          <div className="basis-0.5/3 text-white flex items-center ml-5 text-xl cursor-pointer">
            Xspares
          </div>
          <div className="basis-2/3 h-[100%] ">
            <SearchField />
          </div>
        </div>
        <div className="flex justify-end gap-3 basis-2/5 items-center mr-2">
          <div>
            <CustomButton
              startIcon={<PersonIcon />}
              variant="text"
              fontSize="16px"
              sx={{ color: "white", gap: "0.5rem" }}
              onClick={handleOpen}
            >
              Sign In
            </CustomButton>
          </div>
          <div>
            <CustomButton
              startIcon={
                <ShoppingCartIcon sixe="small" sx={{ color: "white" }} />
              }
            />
          </div>
        </div>
      </div>
      <div>
        <LoginComponent openLogin={openLogin} setOpenLogin={setOpenLogin} />
      </div>
    </div>
  );
}

export default TopNavbar;
