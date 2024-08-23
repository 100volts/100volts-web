import React, { useState, useEffect } from 'react';
import pkg from "../../../package.json";
const urladdress = pkg["volts-server"];

const ElmeterDataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Elmeter data from the API
  const getElmeterData = async () => {
    try {
      const userToken = localStorage.getItem('volts_token');
      const companyName = localStorage.getItem('company_name');
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

      setData(myEmptyArray);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch individual Elmeter data by address
  const getElmeterDataFromAddress = async (elmeterAddress) => {
    try {
      const userToken = localStorage.getItem('volts_token');
      const companyName = localStorage.getItem('company_name');
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
      const { name, address, electric_meter_data } = datat;

      // Return the relevant data
      return {
        name,
        address,
        electric_meter_data,
      };
    } catch (error) {
      console.log('Failed to fetch data: ' + error.message);
      return null; // Return null in case of error
    }
  };

  // Effect hook to fetch data on component mount
  useEffect(() => {
    getElmeterData();
  }, []);

  // Conditional rendering based on loading and error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Elmeter Data</h1>
      {data.map((elmeter, index) => (
        <div key={index}>
            <h2>{elmeter.name} - {elmeter.address}</h2>
            <table >
            <tbody>
            <tr>
              <td>Name</td>
              <td>L1</td>
              <td>L2</td>
              <td>L3</td>
            </tr>
            <tr>
              <td>Voltage:</td>
              <td>{elmeter.electric_meter_data.voltagell1}</td>
              <td>{elmeter.electric_meter_data.voltagell2}</td>
              <td>{elmeter.electric_meter_data.voltagell3}</td>
              <td>V</td>
            </tr>
            <tr>
              <td>Curent:</td>
              <td>{elmeter.electric_meter_data.currentl1}</td>
              <td>{elmeter.electric_meter_data.currentl2}</td>
              <td>{elmeter.electric_meter_data.currentl3}</td>
              <td>A</td>
            </tr>
            <tr>
              <td>Active Power</td>
              <td>{elmeter.electric_meter_data.activepowerl1}</td>
              <td>{elmeter.electric_meter_data.activepowerl2}</td>
              <td>{elmeter.electric_meter_data.activepowerl3}</td>
              <td>W</td>
              </tr>
            <tr>
              <td>pfl1</td>
              <td>{elmeter.electric_meter_data.pfl1}</td>
              <td>{elmeter.electric_meter_data.pfl2}</td>
              <td>{elmeter.electric_meter_data.pfl3}</td>
            </tr>
            <tr>
              <td>Total Active Power: </td>
              <td>{elmeter.electric_meter_data.totalActivePpower}</td>
            </tr>
            <tr>
              <td>Total Active Energy: </td>
              <td>{elmeter.electric_meter_data.totalActiveEnergyImportTariff1}</td>
            </tr>
            </tbody>
            </table>
        </div>
      ))}
    </div>
  );
   // <pre>{JSON.stringify(elmeter.electric_meter_data, null, 2)}</pre>
};

export default ElmeterDataComponent;
