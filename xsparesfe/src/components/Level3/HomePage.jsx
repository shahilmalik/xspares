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
    <div className="bg-slate-200 min-h-screen flex flex-col  items-center gap-y-[8rem]">
      <div className="w-[60%] px-5 mt-[10rem]">
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
        className={`transition-all duration-300 min-w-[60vw] relative mt-5 bg-white border-2 border-black ${
          allSelected ? "mt-[-2rem]" : "shadow-2xl"
        } `}
        style={{ borderRadius: prop.borderRadius.twentyFour }}
      >
        <div className="relative">
          <CarModelSelection
            setAllSelected={setAllSelected}
            allSelected={allSelected}
          />
        </div>
      </div>
      {allSelected && (
        <div className="w-[100vw] grid grid-cols-6 justify-around ">
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
