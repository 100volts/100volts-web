import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from "react";


const Dashboard = () => <h1>Dashboard</h1>;
const Settings = () => <h1>Settings</h1>;
const Profile = () => <h1>Profile</h1>;

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/wokrplace/">Dashboard</Link>
        </li>
        <li>
          <Link to="/wokrplace/settings">Settings</Link>
        </li>
        <li>
          <Link to="/wokrplace/profile">Profile</Link>
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
        { path: 'settings', element: <Settings /> },
        { path: 'profile', element: <Profile /> }
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