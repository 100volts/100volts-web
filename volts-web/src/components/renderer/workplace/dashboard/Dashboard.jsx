"use client";

import { useStore } from "@nanostores/react";
import { KPIDataStore, initLoading } from "@/components/datastore/KPIStore";
import CreateNewKPI from "./CreateNewKPI";
import Loading from "@/components/renderer/workplace/init/InitLoading";
import DashboardKPI from "./DashboardKPI";

export default function Charts() {
  const cardData = useStore(KPIDataStore);
  const progress = useStore(initLoading);

  if (initLoading.get() < 100) {
    return (
      <>
        <h1>KPI</h1>
        <Loading progress={progress} />
      </>
    );
  }
  return (
    <>
      <CreateNewKPI />
      <DashboardKPI cardData={cardData} />
    </>
  );
}
