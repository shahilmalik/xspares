import React from "react";
import CarModelSelection from "../Level2/CarModelSelection";
import { properties } from "@/style/styles";
function HomePage() {
  const prop = properties();
  const paragraph =
    " Stop searching through endless catalogs! At Xparse, we make finding car parts effortless. Simply choose your car’s brand, model, and year to discover a tailored list of spares that fit your car perfectly. Need something specific? Use our smart search to find exactly what you need in seconds. No more guesswork – just the right spares, at the right time, for the right car.";
  const subHeading =
    " Find the Perfect Spares for Your Car – Fast, Easy & Hassle-Free!";
  return (
    <div className="bg-slate-200 h-[93vh] flex flex-col  items-center gap-y-[6rem]">
      <div className="w-[60%] px-5 mt-20">
        <div
          className="header"
          style={{
            fontSize: prop.fontSize.fourtyEight,
            fontWeight: prop.fontWeight.bold,
          }}
        >
          XSPARES
        </div>
        <div
          className="header"
          style={{
            fontSize: prop.fontSize.thirtyTwo,
            fontWeight: prop.fontWeight.semiBold,
          }}
        >
          {subHeading}
        </div>
        <div
          className="sub-heading"
          style={{ fontSize: prop.fontSize.sixteen }}
        >
          {paragraph}
        </div>
      </div>
      <div
        className="min-w-[60vw] relative mt-5 bg-white border-2 border-black  shadow-2xl"
        style={{ borderRadius: prop.borderRadius.twentyFour }}
      >
        <div className="relative">
          <CarModelSelection />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
