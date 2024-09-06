import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from "react";
import WorplaysMeters from "../api/electric/WorplaysMeters";


const Dashboard = () => <h1>Dashboard</h1>;
const Settings = () => <><h1>Electric</h1>
<div className='max-w-[70%] max-w-full '><WorplaysMeters/></div></>;
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
  
  export const App = () => {
    return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  };  