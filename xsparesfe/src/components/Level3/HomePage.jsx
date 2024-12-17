"use client";
import React, { useState } from "react";
import CarModelSelection from "../Level2/CarModelSelection";
import { properties } from "@/style/styles";
import ProductCard from "../Level2/ProductCard";
function HomePage() {
  const [allSelected, setAllSelected] = useState(false);
  const prop = properties();
  const paragraph =
    " Stop searching through endless catalogs! At Xparse, we make finding car parts effortless. Simply choose your car’s brand, model, and year to discover a tailored list of spares that fit your car perfectly. Need something specific? Use our smart search to find exactly what you need in seconds. No more guesswork – just the right spares, at the right time, for the right car.";
  const subHeading =
    " Find the Perfect Spares for Your Car – Fast, Easy & Hassle-Free!";
  return (
    <div className="bg-slate-200 min-h-screen">
      <div
        className={`flex flex-col  items-center gap-y-[8rem] transition-all${
          allSelected ? "mt-[-5rem]" : null
        }`}
      >
        <div
          className={`w-[60%] px-5  transition-all duration-500  ${
            allSelected ? "mt-[-20rem]" : "mt-[15rem]"
          }`}
        >
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
          className={`transition-all duration-500 min-w-[60vw] relative mt-5 bg-white  ${
            allSelected
              ? "fixed top-10 min-w-[100vw] "
              : "shadow-2xl border-2 border-black rounded-[24px]"
          } `}
          // style={{
          //   borderRadius: allSelected ? null : prop.borderRadius.twentyFour,
          // }}
        >
          <div className="relative">
            <CarModelSelection
              setAllSelected={setAllSelected}
              allSelected={allSelected}
            />
          </div>
        </div>
      </div>
      {allSelected && (
        <div className="w-full grid grid-cols-6 justify-around items-center mt-[4rem] ">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      )}
    </div>
  );
}

export default HomePage;
