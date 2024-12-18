import { useState, useEffect } from "react";
import { userData } from "@/components/datastore/UserStore";
import { useStore } from "@nanostores/react";
import {
  KPIDataStore,
  initLoading,
  KPIGroups,
} from "@/components/datastore/KPIStore";
import pkg from "../../../../../package.json";

const urladdress = pkg["volts-server"];

export function initKPIData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const $userData = useStore(userData);

  const companyName = $userData.companies[0]; //todo remove hard coded call
  const userToken = $userData.tokken;

  const getElmeterData = async () => {
    try {
      const body = JSON.stringify({
        company: companyName,
      });
      const response = await fetch(`http://${urladdress}:8081/kpi/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body,
      });
      const datat = await response.json();
      console.log("datat", datat);
      const { KPIData, all_groups } = datat;
      KPIGroups.set(all_groups);
      const dataArr = [];
      for (const element of KPIData) {
        const elmeterData = await mapData(element);
        dataArr.push(elmeterData);
      }
      KPIDataStore.set(dataArr);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      localStorage.setItem("kpi_store", JSON.stringify(KPIDataStore.get()));
      setLoading(false);
      console.log("kpi_store", KPIDataStore.get());
      initLoading.set(100);
    }
  };

  const mapData = async (elmeter) => {
    try {
      const {
        name,
        description,
        group,
        currentTarget,
        energy,
        productionDTO,
        kpiDataDTOS,
      } = elmeter;
      return {
        name,
        description,
        group,
        currentTarget,
        energy,
        productionDTO,
        kpiDataDTOS,
      };
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getElmeterData();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
}
