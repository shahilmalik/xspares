"use client";
import React, { useState, useEffect } from "react";
import CustomSelectField from "../Level1/CustomSelectField";
import axios from "axios";
function CarModelSelection({ setAllSelected, setShowItems }) {
  const [loading, setLoading] = useState();
  const [carMake, setCarMake] = useState(); //API CALL for make
  const [carModel, setCarModel] = useState(); //API CALL for make
  const [carVariant, setCarVariant] = useState(); //API CALL for make
  const [carMakeData, setCarMakeData] = useState(null); //Selected car Make
  const [carModelData, setCarModelData] = useState(null); //Selected car Model
  const [carVariantData, setCarVariantData] = useState(null); //Selected car Variant

  useEffect(() => {
    //API CALL FOR MAKE
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
          `http://localhost:8000/api/get-models-by-make/?make=${carMakeData}`
        );
        setCarModel(response.data);
      } catch (error) {
        console.error("Error posting data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [carMakeData]);

  //API CALL FOR VARIANT
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8000/api/get-variants-by-model/?make=${carMakeData}&model=${carModelData}`
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

  useEffect(() => {
    if (
      carMakeData !== null &&
      carModelData !== null &&
      carVariantData !== null
    ) {
      setAllSelected(true);
    } else {
      setShowItems(false)
      setAllSelected(false);
    }
  }, [setCarVariant, carVariantData]);

  useEffect(() => {
    if (carMakeData === null) {
      setCarModelData(null);
      setCarVariantData(null);
    }
    if (carModelData === null) {
      setCarVariantData(null);
    }
  }, [carMakeData, carVariantData, setCarMakeData]);
  return (
    <div className="flex justify-between m-5 gap-x-6">
      <CustomSelectField
        label="Select Make"
        width="100%"
        data={carMake}
        selectedData={setCarMakeData}
      />
      <CustomSelectField
        label="Select Model"
        width="100%"
        data={carModel}
        disabled={carMakeData !== null ? false : true}
        selectedData={setCarModelData}
      />
      <CustomSelectField
        label="Select Variant"
        width="100%"
        data={carVariant}
        disabled={carMakeData !== null && carModelData !== null ? false : true}
        selectedData={setCarVariantData}
      />
    </div>
  );
}

export default CarModelSelection;
