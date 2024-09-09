import React, { useState, useEffect }  from "react";
import {userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';
import {elMeterDashDataStore} from "@/pages/store/ElectricStore"
import pkg from "../../../package.json";

const urladdress = pkg["volts-server"];

export function initElectricityData(){
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const $userData=useStore(userData);
  const $elMeterDashDataStore=useStore(elMeterDashDataStore);
  
  const companyName = $userData.companies[0];//todo remove hard coded call
  const userToken =$userData.tokken
  
  const getElmeterData = async () => {
    try {
      const body = JSON.stringify({
        company_name: companyName,
      });
      const response = await fetch(
        `http://${urladdress}:8081/elmeter/company/address/list`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body,
        }
      );
      const datat = await response.json();
      const { address_list } = datat;
      for (const element of address_list) {
        const elmeterData = await getElmeterDataFromAddress(element);
        elMeterDashDataStore.setKey(element,elmeterData)
      }
    } catch (error) {
      setError(error.message);
    } finally {
        localStorage.setItem("electricity_store",JSON.stringify(elMeterDashDataStore.get()));
      setLoading(false);
    }
  };

  const getElmeterDataFromAddress = async (elmeterAddress) => {
    try {
      const response = await fetch(
        `http://${urladdress}:8081/elmeter/data/last`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            company_name: companyName,
            address: elmeterAddress,
          }),
        }
      );

      const datat = await response.json();
      const {
        name,
        address,
        electric_meter_data,
        electric_meter_avr_data,
        daily_tariff_data,
        lastWeekEnergy
      } = datat;
      console.log("lastWeekEnergy",lastWeekEnergy)
      return {
        name,
        address,
        electric_meter_data,
        electric_meter_avr_data,
        daily_tariff_data,
        lastWeekEnergy
      };
    } catch (error) {
      console.log("Failed to fetch data: " + error.message);
      return null;
    }
  };
  if($elMeterDashDataStore){
    useEffect(() => {
      getElmeterData();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  }
}