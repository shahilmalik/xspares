"use client";
import React, { useState } from "react";
import CustomSelectField from "../Level1/CustomSelectField";

function CarModelSelection({data1, data2, data3}) {
  const [carBrandData, setCarBrandData] = useState(null);
  const [carModelData, setCarModelData] = useState(null);
  const [carYearData, setCarYearData] = useState(null);
  

  return (
    <div className="flex justify-between m-5">
      <CustomSelectField
        label="Select Brand"
        width="20rem"
        data={data1}
        selectedData={setCarBrandData}
      />
      <CustomSelectField
        label="Select Model"
        width="20rem"
        data={data2}
        disabled={carBrandData !== null ? false : true}
        selectedData={setCarModelData}
      />
      <CustomSelectField
        label="Year"
        width="20rem"
        data={data3}
        disabled={carBrandData !== null && carModelData !== null ? false : true}
        selectedData={setCarYearData}
      />
    </div>
  );
}

export default CarModelSelection;
