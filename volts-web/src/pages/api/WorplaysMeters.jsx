import React, { useState, useEffect } from 'react';
import pkg from "../../../package.json";
const urladdress = pkg["volts-server"];
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DayilyTatiff from "../../components/react/electric/DayilyTatiff"
import OptionsButtons from "../../components/react/electric/OptionsButtons"
import ElectricGraphs from "../../components/react/electric/ElectricGraphs"


const ElmeterDataComponent = () => {
  const [data, seTableCellata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userToken = localStorage.getItem('volts_token');
  const companyName = localStorage.getItem('company_name');

  // Fetch Elmeter data from the API
  const getElmeterData = async () => {
    try {
      const body= JSON.stringify({
        company_name: companyName,
      })
      const response = await fetch(
        `http://${urladdress}:8081/elmeter/company/address/list`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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

  // Fetch individual Elmeter data by address
  const getElmeterDataFromAddress = async (elmeterAddress) => {
    try {
      const response = await fetch(`http://${urladdress}:8081/elmeter/data/last`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          company_name: companyName,
          address: elmeterAddress,
        }),
      });

      const datat = await response.json();
      const { name, address, electric_meter_data,electric_meter_avr_data, daily_tariff_data } = datat;

      // Return the relevant data
      return {
        name,
        address,
        electric_meter_data,
        electric_meter_avr_data,
        daily_tariff_data
      };
    } catch (error) {
      console.log('Failed to fetch data: ' + error.message);
      return null;
    }
  };

  // Effect hook to fetch data on component mount
  useEffect(() => {
    getElmeterData();
  }, []);

  // Conditional rendering based on loading and error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
 // const chart=new Example();
  //console.log(chart)
  //<h1>Elmeter Data</h1>
  console.log(data)

  return (
    <div style={{maxWidth: "70%"}}>
      <br></br> 
      {data.map((elmeter, index) => (
        <div key={index}  >
            <h2>{elmeter.name} - {elmeter.address}</h2>
            <div style={{display: "flex", justifyItems:"center", alignItems: "flex-start", flexWrap: "nowrap"}}>
            <div style={{display: "flex", justifyItems:"center", alignItems: "flex-start", flexWrap: "nowrap"}}>
            <Table >
            <TableBody>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>L1</TableHead>
              <TableHead>L2</TableHead>
              <TableHead>L3</TableHead>
            </TableRow>
            <TableRow>
              <TableCell>Voltage:</TableCell>
              <TableCell>{elmeter.electric_meter_data.voltagell1}</TableCell>
              <TableCell>{elmeter.electric_meter_data.voltagell2}</TableCell>
              <TableCell>{elmeter.electric_meter_data.voltagell3}</TableCell>
              <TableCell>V</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Curent:</TableCell>
              <TableCell>{elmeter.electric_meter_data.currentl1}</TableCell>
              <TableCell>{elmeter.electric_meter_data.currentl2}</TableCell>
              <TableCell>{elmeter.electric_meter_data.currentl3}</TableCell>
              <TableCell>A</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Active Power</TableCell>
              <TableCell>{elmeter.electric_meter_data.activepowerl1}</TableCell>
              <TableCell>{elmeter.electric_meter_data.activepowerl2}</TableCell>
              <TableCell>{elmeter.electric_meter_data.activepowerl3}</TableCell>
              <TableCell>W</TableCell>
              </TableRow>
            <TableRow>
              <TableCell>pfl1</TableCell>
              <TableCell>{elmeter.electric_meter_data.pfl1}</TableCell>
              <TableCell>{elmeter.electric_meter_data.pfl2}</TableCell>
              <TableCell>{elmeter.electric_meter_data.pfl3}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Active Power: </TableCell>
              <TableCell>{elmeter.electric_meter_data.totalActivePpower}</TableCell>
              <TableCell>Total Active Energy: </TableCell>
              <TableCell>{elmeter.electric_meter_data.totalActiveEnergyImportTariff1}</TableCell>
            </TableRow>
            <TableRow>
              
            </TableRow>
            </TableBody>
            </Table>
            <div>
            <ElectricGraphs elmeterProp={elmeter}/>
            <DayilyTatiff elmeterProp={elmeter}/>
            </div>
            </div>
            <OptionsButtons/>
            </div>
        </div>
      ))}
    </div>
  );
   // <pre>{JSON.stringify(elmeter.electric_meter_data, null, 2)}</pre>
};

export default ElmeterDataComponent;
