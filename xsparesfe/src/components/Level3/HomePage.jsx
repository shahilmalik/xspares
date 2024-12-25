"use client";
import React, { useState } from "react";
import CarModelSelection from "../Level2/CarModelSelection";
import { properties } from "@/style/styles";
import ProductCard from "../Level2/ProductCard";
import categories from "../../json/Categories.json";
import productData from "../../json/productData.json";
import CategoryCard from "../Level1/CategoryCard";
import CustomButton from "../Level1/CustomButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
function HomePage() {
  const [showItems, setShowItems] = useState(false);
  const [allSelected, setAllSelected] = useState(false);
  const prop = properties();
  const paragraph =
    " Stop searching through endless catalogs! At Xparse, we make finding car parts effortless. Simply choose your car’s brand, model, and year to discover a tailored list of spares that fit your car perfectly. Need something specific? Use our smart search to find exactly what you need in seconds. No more guesswork – just the right spares, at the right time, for the right car.";
  const subHeading =
    " Find the Perfect Spares for Your Car – Fast, Easy & Hassle-Free!";
  return (
    <div className="bg-slate-200 min-h-screen">
      <div
        className={`flex flex-col  items-center gap-y-[8rem] transition-all ${
          allSelected ? "" : null
        }`}
      >
        <div // Xparse Content Headings, SubHeadings and content
          className={`w-[60%] px-5  transition-all duration-500  ${
            allSelected ? "mt-[-20rem]" : "mt-[15rem]"
          }`}
        >
          <div
            style={{
              fontSize: prop.fontSize.fourtyEight,
              fontWeight: prop.fontWeight.bold,
            }}
          >
            XSPARES
          </div>
          <div
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
        <div //Model / Filter Section
          className={`transition-all duration-500 min-w-[60vw] relative mt-5 bg-white  ${
            allSelected
              ? "fixed top-10 min-w-[100vw] "
              : "shadow-2xl border-2 border-black rounded-[24px]"
          } `}
        >
          <div className="relative">
            <CarModelSelection
              setAllSelected={setAllSelected}
              setShowItems={setShowItems}
              allSelected={allSelected}
            />
          </div>
        </div>
      </div>

      {allSelected && !showItems && (
        <div className="flex flex-wrap items-stretch mt-[6vh]">
          {categories?.categories.map((item) => (
            <div onClick={() => setShowItems(true)}>
              <CategoryCard data={item} />
            </div>
          ))}
        </div>
      )}
      {allSelected && showItems && (
        <>
          <div className="flex flex-col justify-center">
            <div
              className="mt-16 ml-4 w-[15rem]"
              onClick={() => setShowItems(false)}
            >
              {" "}
              <CustomButton
                startIcon={<KeyboardArrowLeftIcon />}
                sx={{ backgroundColor: "white", color: "black" }}
              >
                Back to Categories
              </CustomButton>{" "}
            </div>
          </div>
          <div className="flex flex-wrap items-stretch ">
            {productData.engineComponents.map((item) => (
              <ProductCard data={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
