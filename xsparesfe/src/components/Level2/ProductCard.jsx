import React from "react";
import CustomButton from "../Level1/CustomButton";
import { properties } from "@/style/styles";
import StarRating from "../Level1/StarRating";
function ProductCard({ data }) {
  const prop = properties();
  return (
    <div className="hover:shadow-xl transition-all duration-300 rounded-2xl hover:translate-y-[-0.2rem] p-4 bg-white m-4 w-[16rem] cursor-pointer">
      <div className=" flex items-center justify-center">
        <div className="h-[10rem] w-[15rem] bg-slate-100 border-2 rounded-2xl flex justify-center items-center"></div>
      </div>
      <div>
        <div className="ml-2 my-2">
          <div
            style={{
              fontSize: prop.fontSize.sixteen,
              fontWeight: prop.fontWeight.bold,
            }}
          >
            {data.name}
          </div>
          <div style={{ fontSize: prop.fontSize.twelve }}>#{data.sku}</div>
          <StarRating rating={data.starRating} />
          <div>
            {" "}
            <span
              style={{
                fontSize: prop.fontSize.sixteen,
                fontWeight: prop.fontWeight.bold,
              }}
            >
              Price :{" "}
            </span>
            Rs.{data.price}
          </div>
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
