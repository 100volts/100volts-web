import { map } from "nanostores";
import type { Company } from "./UserStore";

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

export type ProductionDataPackage = {
  name: string;
  description: string;
  dateOfCreation: string;
  units: Unit;
  company: Company;
  groups: Group[];
  electricMeters: Meter[];
  monthlyData: MonthValue[];
};

export const productionDashDataStore = map<
  Record<string, ProductionDataPackage>
>({});
