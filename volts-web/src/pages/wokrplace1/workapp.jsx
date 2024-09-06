import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Zap, Droplet, Flame, Factory } from "lucide-react"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect }  from "react";
import WorplaysMeters from "../api/electric/WorplaysMeters";
import {initElectricityData} from "./initElectrisityData"

const Dashboard = () => <h1>Dashboard</h1>;
function Settings () {
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