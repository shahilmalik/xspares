"use client";
import React, { useState, useEffect } from "react";
import CustomSelectField from "../Level1/CustomSelectField";
import axios from "axios";
function CarModelSelection() {
  const [loading, setLoading] = useState();
  const [carMake, setCarMake] = useState(); //API CALL for make
  const [carModel, setCarModel] = useState(); //API CALL for make
  const [carVariant, setCarVariant] = useState(); //API CALL for make
  const [carBrandData, setCarBrandData] = useState(null); //Selected car
  const [carModelData, setCarModelData] = useState(null);
  const [carVariantData, setCarVariantData] = useState(null);

  useEffect(() => {//API CALL FOR MAKE
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/get-makes/`
        );
        setCarMake(response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //API CALL FOR MODELS
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/get-models-by-make/?make=${carBrandData}`
        );
        setCarModel(response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [carBrandData]);

  //API CALL FOR VARIANT
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/get-variants-by-model/?make=${carBrandData}&model=${carModelData}`
        );
        setCarVariant(response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [carModelData]);

  return (
    <div className="flex justify-between m-5">
      <CustomSelectField
        label="Select Make"
        width="20rem"
        data={carMake}
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
        data={carVariant}
        disabled={carBrandData !== null && carModelData !== null ? false : true}
        selectedData={setCarVariantData}
      />
    </div>
  );
}

export default CarModelSelection;
