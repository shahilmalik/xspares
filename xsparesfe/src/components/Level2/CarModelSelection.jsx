"use client";
import React, { useState } from "react";
import CustomSelectField from "../Level1/CustomSelectField";

function CarModelSelection() {
  const carBrand = [
    //Dummy data
    { option: "Maruti Suzuki" },
    { option: "Hyundai" },
    { option: "Tata Motors" },
    { option: "Mahindra" },
    { option: "Honda" },
  ];
  const carModel = [
    //Dummy data
    { option: "Swift" },
    { option: "Creta" },
    { option: "Nexon" },
    { option: "XUV700" },
    { option: "City" },
  ];

  const carYears = [
    //Dummy data
    { option: "2012" },
    { option: "2015" },
    { option: "2016" },
    { option: "2018" },
    { option: "2020" },
  ];
  const [carBrandData, setCarBrandData] = useState(null);
  const [carModelData, setCarModelData] = useState(null);
  const [carYearData, setCarYearData] = useState(null);

  return (
    <div className="flex justify-between m-5">
      <CustomSelectField
        label="Select Make"
        width="20rem"
        data={carBrand}
        selectedData={setCarBrandData}
      />
      <CustomSelectField
        label="Select Model"
        width="20rem"
        data={carModel}
        disabled={carBrandData !== null ? false : true}
        selectedData={setCarModelData}
      />
      <CustomSelectField
        label="Select Variant"
        width="20rem"
        data={carYears}
        disabled={carBrandData !== null && carModelData !== null ? false : true}
        selectedData={setCarYearData}
      />
    </div>
  );
}

export default CarModelSelection;
