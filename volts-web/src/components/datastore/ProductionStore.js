import { map, atom } from "nanostores";
/*
export type Unit = {
  name: string;
  value: string;
};

export type Group = {
  name: string;
  description: string;
};

export type Meter = {
  companyId: number;
  meterAddress: number;
  meterName: string;
};

export type MonthValue = {
  companyId: number;
  meterAddress: number;
  meterName: string;
};

export type ProductionData = {
  id: number;
  values: number;
  date: string;
};

export type ProductionDataPackage = {
  name: string;
  description: string;
  dateOfCreation: string;
  units: Unit;
  company: any;
  groups: Group[];
  electricMeters: Meter[];
  monthlyData: MonthValue[];
  last10: ProductionData[];
};
*/
export const initLoading = atom(0);
export const prodGroup = atom();
export const prodElMeterNames = atom();
export const selectedProduction = atom();
export const reportProdData = atom();

export const productionDashDataStore = atom(); // map({});
