import  { useState, useEffect }  from "react";
import {userData } from "@/components/datastore/UserStore";
import { useStore } from '@nanostores/react';
import {gasDataPack,gasDataNames,gasDataSum } from "@/components/datastore/GasStore";
import pkg from "../../../../../package.json";

const urladdress = pkg["volts-server"];

export default function initgas(){
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
            `http://${urladdress}:8081/gas/all`,
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
          const { gas,sum_value,meter_names } = datat; 
        console.log("gas data",gas)
        gasDataPack.set(gas);
        gasDataSum.set(sum_value);
        gasDataNames.set(meter_names);

        console.log("gas data got",gasDataPack.get())
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