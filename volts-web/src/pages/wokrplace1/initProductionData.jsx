import React, { useState, useEffect }  from "react";
import {userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';
import {productionDashDataStore} from "@/pages/store/ProductionStore"
import pkg from "../../../package.json";

const urladdress = pkg["volts-server"];

export function initProductiondDashData(){
    const [data, setProdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const $userData=useStore(userData);
    const $productionDashDataStore=useStore(productionDashDataStore);
    const companyName = $userData.companies[0];//todo remove hard coded call
    const userToken =$userData.tokken

    const getProdData = async () => {
        try {
          const body = JSON.stringify({
            company_name: companyName,
          });
          const response = await fetch(
            `http://${urladdress}:8081/production/company/all`,
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
          const { production } = datat;    
          productionDashDataStore.set(production)
          console.log("$productionDashDataStore",$productionDashDataStore)
          setProdData(production);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getProdData();
      }, []);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
}