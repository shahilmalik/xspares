import React from "react";
import SearchField from "../Level1/SearchField";
import CustomButton from "../Level1/CustomButton";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
function TopNavbar() {
  return (
    <div className="p-1 bg-[#21266b]">
      <div className="flex justify-between items-center h-[3.5rem] w-full">
        <div className="flex basis-3/5 justify-start gap-x-6 ">
          <div className="basis-0.5/3 text-white flex items-center ml-5 text-xl">
            Xspares
          </div>
          <div className="basis-2/3 h-[100%] ">
            <SearchField />
          </div>
        </div>
        <div className="flex justify-end gap-3 basis-2/5 items-center mr-2">
          {/* <CustomButton variant="text" fontSize="13px" sx={{ color: "white" }}>
            Select City
          </CustomButton> */}
          <CustomButton
            startIcon={<PersonIcon />}
            variant="text"
            fontSize="16px"
            sx={{ color: "white" }}
          >
            Sign In
          </CustomButton>
          <IconButton>
            <ShoppingCartIcon sixe="small" sx={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
