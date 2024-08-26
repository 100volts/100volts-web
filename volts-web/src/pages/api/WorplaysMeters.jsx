import React, { useState, useEffect } from 'react';
import pkg from "../../../package.json";
import Example from '../chart/ExampleChart';
const urladdress = pkg["volts-server"];


const ElmeterDataComponent = () => {
  const [data, setData] = useState([]);
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
      const { name, address, electric_meter_data,electric_meter_avr_data } = datat;

      // Return the relevant data
      return {
        name,
        address,
        electric_meter_data,
        electric_meter_avr_data
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
  const dataVoltage = [
    { name: 'A', value: 240, color: '#011F26' },
  ];
  const dataCurent = [
    { name: 'A', value: 100, color: '#011F26' },
    { name: 'B', value: 250, color: '#025E73' },
    { name: 'C', value: 50, color: '#F2A71B' },
  ];
  const dataPower = [
    { name: 'A', value: 20, color: '#011F26' },
    { name: 'B', value: 65, color: '#025E73' },
    { name: 'C', value: 15, color: '#F2A71B' },
  ];
  const dataG = [
    { name: 'A', value: 35, color: '#011F26' },
    { name: 'B', value: 35, color: '#025E73' },
    { name: 'C', value: 25, color: '#F2A71B' },
  ];
  return (
    <div>
      <br></br> 
      {data.map((elmeter, index) => (
        <div key={index}  >
            <h2>{elmeter.name} - {elmeter.address}</h2>
            <div style={{display: "flex", justifyItems:"center", alignItems: "flex-start", flexWrap: "nowrap"}}>
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
            <div  style={{display: "flex", justifyItems:"center", alignItems: "flex-start", flexWrap: "nowrap"}}>
              <div className='pie_chart_with_needle'  style={{display: "flex", justifyItems:"center", alignItems: "flex-start", flexWrap: "nowrap"}}>
                <Example niddleValue={elmeter.electric_meter_avr_data.voltage} data={dataVoltage} chartName={"Voltage"}/>
                <Example niddleValue={elmeter.electric_meter_avr_data.current} data={dataCurent}  chartName={"Curent"}/>
                <Example niddleValue={elmeter.electric_meter_avr_data.power/1000} data={dataPower}  chartName={"Power"}/>
                <Example niddleValue={elmeter.electric_meter_avr_data.powerFactor} data={dataG}  chartName={"Power Factor"}/>
              </div>
              <div className='dayly_read_tarrif'></div>
            </div>
            </div>
        </div>
      ))}
    </div>
  );
   // <pre>{JSON.stringify(elmeter.electric_meter_data, null, 2)}</pre>
};

export default ElmeterDataComponent;
