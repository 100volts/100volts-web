import React, { useState, useEffect } from 'react';
import pkg from "../../../package.json";
import Example from '../chart/ExampleChart';
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
import { Button } from "@/components/ui/button"



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
            </TableRow>
            <TableRow>
              <TableCell>Total Active Energy: </TableCell>
              <TableCell>{elmeter.electric_meter_data.totalActiveEnergyImportTariff1}</TableCell>
            </TableRow>
            </TableBody>
            </Table>
            <div>
            <div  style={{display: "flex", justifyItems:"center", alignItems: "flex-start", flexWrap: "nowrap"}}>
              <div className='pie_chart_with_needle'  style={{display: "flex", justifyItems:"center", alignItems: "flex-start", flexWrap: "nowrap"}}>
                <Example niddleValue={elmeter.electric_meter_avr_data.voltage} data={dataVoltage} chartName={"Voltage"}/>
                <Example niddleValue={elmeter.electric_meter_avr_data.current} data={dataCurent}  chartName={"Curent"}/>
                <Example niddleValue={elmeter.electric_meter_avr_data.power/1000} data={dataPower}  chartName={"Power"}/>
                <Example niddleValue={elmeter.electric_meter_avr_data.powerFactor} data={dataG}  chartName={"Power Factor"}/>
              </div>
              <div className='dayly_read_tarrif'></div>
            </div>
            <Table>
            <TableCaption>.</TableCaption>

            {elmeter.daily_tariff_data && elmeter.daily_tariff_data.length > 0 ?(<>
              <TableRow>
              <TableHead>Houler:</TableHead>
            {elmeter.daily_tariff_data.map((traff,index)=>(
              <>
                <TableHead>{index+1}</TableHead>
              </>
            ))}
            </TableRow>
            <TableBody>
            <TableRow>
            <TableCell></TableCell>
            {elmeter.daily_tariff_data.map((traff,index)=>(
              <>
                <TableCell>{traff.totPower}</TableCell>
              </>
            ))}
            </TableRow>
            <TableRow>
            <TableCell></TableCell>
            {elmeter.daily_tariff_data.map((traff,index)=>{
              
              const date = new Date(traff.timeStamp);
              const dayOfMonth = date.getDate();
              const hours = date.getHours();
              return(<>
                <TableCell>{hours}</TableCell>
              </>)
              
            })}
            </TableRow>
                </TableBody>
          </>):
            <>
              <TableRow className="text-center">
                No new reads for doday 
              </TableRow>
            </>
            }
            </Table>
            </div>
            </div>
            <div>
              <Button variant="outline">
                <a style={{width:"25px"}}>i</a>
            </Button>
              <Button variant="outline"><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </Button>
            </div>
            </div>
        </div>
      ))}
    </div>
  );
   // <pre>{JSON.stringify(elmeter.electric_meter_data, null, 2)}</pre>
};

export default ElmeterDataComponent;
