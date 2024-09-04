import React, { useState, useEffect } from "react";
import pkg from "../../../../package.json";
import DayilyTatiff from "../../../components/react/electric/DayilyTatiff";
import OptionsButtons from "../../../components/react/electric/OptionsButtons";
import ElectricGraphs from "../../../components/react/electric/ElectricGraphs";
import AllElectricMeterDataTable from "../../../components/react/electric/AllElectricMeterDataTable";
import { Card } from "@/components/ui/card";

const urladdress = pkg["volts-server"];

const ElmeterDataComponent = () => {
  const [data, seTableCellata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userToken = localStorage.getItem("volts_token");
  const companyName = localStorage.getItem("company_name");

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
      const myEmptyArray = [];

      for (const element of address_list) {
        const elmeterData = await getElmeterDataFromAddress(element);
        myEmptyArray.push(elmeterData);
      }

      seTableCellata(myEmptyArray);
    } catch (error) {
      setError(error.message);
    } finally {
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
      } = datat;

      return {
        name,
        address,
        electric_meter_data,
        electric_meter_avr_data,
        daily_tariff_data,
      };
    } catch (error) {
      console.log("Failed to fetch data: " + error.message);
      return null;
    }
  };

  useEffect(() => {
    getElmeterData();
  }, []);

  // Conditional rendering based on loading and error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // const chart=new Example();
  //console.log(chart)
  //<h1>Elmeter Data</h1>
  //console.log(data)

  return (
    <div style={{ maxWidth: "70%" }}>
      {data.map((elmeter, index) => (
        <div key={index}>
          <h2 style={{ padding: "10px" }}>
            {elmeter.name} - {elmeter.address}
          </h2>
          <div
            className="flex flex-col md:flex-row"
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              className="flex flex-col md:flex-row"
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "flex-start",
              }}
            >
              <Card style={{ padding: "10px", margin: "10px" }}>
                <AllElectricMeterDataTable elmeterProp={elmeter} />
              </Card>
              <div style={{ padding: "10px" }}>
                <Card>
                  <ElectricGraphs elmeterProp={elmeter} />
                </Card>
                <Card>
                  <DayilyTatiff elmeterProp={elmeter} />
                </Card>
              </div>
            </div>
            <OptionsButtons address={elmeter.address} />
          </div>
        </div>
      ))}
    </div>
  );
  // <pre>{JSON.stringify(elmeter.electric_meter_data, null, 2)}</pre>
};

export default ElmeterDataComponent;

//context for global
//state management

