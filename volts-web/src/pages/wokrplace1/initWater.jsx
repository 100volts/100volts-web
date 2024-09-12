import  { useState, useEffect }  from "react";
import {userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';
import {waterDataPack,waterDataNames,waterDataSum } from "@/pages/store/WaterStore";
import pkg from "../../../package.json";

const urladdress = pkg["volts-server"];

export default function initWater(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const $userData=useStore(userData);
    const companyName = $userData.companies[0];//todo remove hard coded call
    const userToken =$userData.tokken

    const getProdData = async () => {
        try {
          const body = JSON.stringify({
            company_name: companyName,
          });
          const response = await fetch(
            `http://${urladdress}:8081/water/all`,
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
          const { watter,sum_value,meter_names } = datat; 
        console.log("water data",watter)
        waterDataPack.set(watter);
        waterDataSum.set(sum_value);
        waterDataNames.set(meter_names);

        console.log("water data got",waterDataPack.get())
        } catch (error) {
          setError(error.message);
        }finally {
            setLoading(false);
          }
      };
      useEffect(() => {
        getProdData();
      }, []);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
}