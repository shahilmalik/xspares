import React from "react";
import CustomButton from "../Level1/CustomButton";
import { properties } from "@/style/styles";
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
function ProductCard() {
  const prop = properties();
  return (
    <div className="hover:shadow-2xl transition-all duration-300 rounded-2xl hover:translate-y-[-0.5rem] p-4 bg-white m-4 w-[16rem] cursor-pointer">
      <div className=" flex items-center justify-center">
        <div className="h-[10rem] w-[15rem] bg-slate-100 border-2 rounded-2xl flex justify-center items-center">
        </div>
      </div>
      <div>
        <div className="ml-2 my-2">
          <div
            style={{
              fontSize: prop.fontSize.sixteen,
              fontWeight: prop.fontWeight.bold,
            }}
          >
            Air Filter
          </div>
          <div style={{ fontSize: prop.fontSize.twelve }}>#SUK&789</div>
        </div>
        <div className="flex mb-1">
            <StarIcon/>
            <StarIcon/>
            <StarIcon/>
            <StarIcon/>
            <StarHalfIcon/>
        </div>
        {/* Add Counte here */}
      </div>
      <div>
        <CustomButton
          variant="contained"
          sx={{
            backgroundColor: "#161616",
            borderRadius: prop.borderRadius.eight,
          }}
        >
          Buy now
        </CustomButton>
      </div>
    </div>
  );
}

export default ProductCard;
