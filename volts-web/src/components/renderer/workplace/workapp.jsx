import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Zap, Droplet, Flame, Factory } from "lucide-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorplaysMeters from "./electric/WorplaysMeters";
import DisplayAllProductions from "./production/DisplayAllProductions";
import { initElectricityData } from "./init/initElectrisityData";
import { initProductiondDashData } from "./init/initProductionData";
import { initKPIData } from "./init/initKPI";
import GetReport from "./production/GetReport";
import GetElectricReport from "./electric/GetReport";
import DashboardWorkPlace from "@/components/renderer/workplace/dashboard/Dashboard";
import ProductionSettingsComponent from "./production/Settings";
import TokkenCheck from "./TokkenCheck";
import InitWater from "./init/initWater";
import InitGas from "./init/initGas";
import DisplayWater from "./water/DisplayWater";
import DisplayGas from "./gas/DisplayGas";

const Dashboard = () => (
  <>
    <div>
      <h1>Dashboard</h1>
      <DashboardWorkPlace />
    </div>
  </>
);
const Electric = () => (
  <>
    <TokkenCheck />
    <h1>Electricity</h1>
    <div>
      <WorplaysMeters />
    </div>
  </>
);
const ElesctricReport = () => (
  <>
    <h1>Electric Report</h1>
    <GetElectricReport />
  </>
);
const Production = () => (
  <>
    <h1>Production</h1>
    <div>
      <DisplayAllProductions />
    </div>
  </>
);
const ProductionSettings = () => (
  <>
    <h1>
      Settings
      <div>
        <ProductionSettingsComponent />
      </div>
    </h1>
  </>
);
const Gas = () => (
  <>
    <h1>Gas</h1>
    <DisplayGas />
  </>
);
const Watter = () => (
  <>
    <h1>Watter</h1>
    <DisplayWater />
  </>
);
const ProductionReport = () => (
  <>
    <h1>Production Reports</h1>
    <GetReport />
  </>
);

const Navbar = () => {
  return (
    <nav className="mb-4 rounded-lg bg-background p-4 shadow-md">
      <ul className="flex flex-wrap justify-center gap-4">
        <li>
          <Button
            variant="ghost"
            className="min-w-[200px] flex-1 justify-between"
            asChild
          >
            <Link to="/wokrplace/">
              <div className="flex items-center">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </div>
            </Link>
          </Button>
        </li>
        <li>
          <Button
            variant="ghost"
            className="min-w-[200px] flex-1 justify-between"
            asChild
          >
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
          <Button
            variant="ghost"
            className="min-w-[200px] flex-1 justify-between"
            asChild
          >
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
          <Button
            variant="ghost"
            className="min-w-[200px] flex-1 justify-between"
            asChild
          >
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
          <Button
            variant="ghost"
            className="min-w-[200px] flex-1 justify-between"
            asChild
          >
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
  );
};

const Layout = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <Outlet />
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "wokrplace",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "elesctric", element: <Electric /> },
      { path: "elesctric/report", element: <ElesctricReport /> },
      { path: "production", element: <Production /> },
      { path: "water", element: <Watter /> },
      { path: "gas", element: <Gas /> },
      { path: "production/productionReport", element: <ProductionReport /> },
      { path: "production/settings", element: <ProductionSettings /> },
    ],
  },
]);

export const App = () => {
  initElectricityData();
  initProductiondDashData();
  InitWater();
  TokkenCheck();
  InitGas();
  initKPIData();
  //</React.StrictMode>
  return <RouterProvider router={router} />;
};
