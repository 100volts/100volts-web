import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect }  from "react";
import WorplaysMeters from "../api/electric/WorplaysMeters";
import {userData } from "@/pages/store/userStore";
import { useStore } from '@nanostores/react';
import {elMeterDashDataStore} from "@/pages/store/ElectricStore"
import pkg from "../../../package.json";



const urladdress = pkg["volts-server"];

const Dashboard = () => <h1>Dashboard</h1>;
function Settings () {
  ///

return(
<><h1>Electric</h1>
<div className='max-w-[70%] max-w-full '><WorplaysMeters/></div></>
)};
const Profile = () => (<h1>Production</h1>);

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/wokrplace/">Dashboard</Link>
        </li>
        <li>
          <Link to="/wokrplace/elesctric">Elctrisity</Link>
        </li>
        <li>
          <Link to="/wokrplace/production">Production</Link>
        </li>
      </ul>
    </nav>
  );
};

const Layout = () => (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
);

const router = createBrowserRouter([
    {
      path: 'wokrplace',
      element: <Layout />,
      children: [
        { path: 'wokrplace', element: <Dashboard /> },
        { path: 'elesctric', element: <Settings /> },
        { path: 'production', element: <Profile /> }
      ]
    }
  ]);

function initElectricityData(){
    const [data, seTableCellata] = useState([]);
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
      const myEmptyArray = [];

      for (const element of address_list) {
        const elmeterData = await getElmeterDataFromAddress(element);
        elMeterDashDataStore.setKey(element,elmeterData)
        //myEmptyArray.push(elmeterData);
      }

      seTableCellata(myEmptyArray);
    } catch (error) {
      setError(error.message);
    } finally {
      //const $elMeterDashDataStore=useStore(elMeterDashDataStore);
      console.log("$elMeterDashDataStore",elMeterDashDataStore.get())
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
  
if($elMeterDashDataStore){
  useEffect(() => {
    getElmeterData();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  ///
}
}
  
  export const App = () => {
    initElectricityData();
    ///
    
    ///
    return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  };  