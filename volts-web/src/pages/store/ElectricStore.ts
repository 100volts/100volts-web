import { atom, map } from "nanostores";

export const isLogedIn: boolean = atom(false);

export type ElectricMeterData = {
  merterId: number;
  voltagell1: string;
  voltagell2: string;
  voltagell3: string;
  currentl1: string;
  currentl2: string;
  currentl3: string;
  activepowerl1: string;
  activepowerl2: string;
  activepowerl3: string;
  pfl1: string;
  pfl2: string;
  pfl3: string;
  totalActivePpower: string;
  totalActiveEnergyImportTariff1: string;
  totalActiveEnergyImportTariff2: string;
};

export type ElMeterAvrFifteenMinuteLoad = {
  voltage: string;
  current: string;
  power: string;
  powerFactor: string;
};

export type TotPower = {
  totPower: string;
  timeStamp: string;
};

export type ElectricMeterDashboardData = {
  name: string;
  address: any;
  electric_meter_data: any;
  electric_meter_avr_data: any;
  daily_tariff_data: any;
};

export type Company = {
  name: string;
};

export const elMeterDashDataStore = map<
  Record<string, ElectricMeterDashboardData>
>({});
