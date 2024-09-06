import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Zap, Droplet, Flame, Factory } from "lucide-react"
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
    <nav className="p-4 bg-background shadow-md rounded-lg mb-4">
      <ul className="flex flex-wrap justify-center gap-4">
        <li>
          <Button variant="ghost" className="flex-1 min-w-[200px] justify-between" asChild>
            <Link to="/wokrplace/">
              <div className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </div>
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="flex-1 min-w-[200px] justify-between" asChild>
            <Link to="/wokrplace/elesctric">
              <div className="flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                Electricity
              </div>
              <span className="text-sm text-muted-foreground">250 kWh</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="flex-1 min-w-[200px] justify-between" asChild>
            <Link to="/wokrplace/production">
              <div className="flex items-center">
                <Factory className="mr-2 h-4 w-4" />
                Production
              </div>
              <span className="text-sm text-muted-foreground">1000 units</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="flex-1 min-w-[200px] justify-between" asChild>
            <Link to="/wokrplace/water">
              <div className="flex items-center">
                <Droplet className="mr-2 h-4 w-4" />
                Water
              </div>
              <span className="text-sm text-muted-foreground">100 m³</span>
            </Link>
          </Button>
        </li>
        <li>
          <Button variant="ghost" className="flex-1 min-w-[200px] justify-between" asChild>
            <Link to="/wokrplace/gas">
              <div className="flex items-center">
                <Flame className="mr-2 h-4 w-4" />
                Gas
              </div>
              <span className="text-sm text-muted-foreground">50 m³</span>
            </Link>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

const Layout = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <Outlet />
    </div>
  </div>
)


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