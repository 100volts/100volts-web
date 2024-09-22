"use client";

import ImputProduction from "./ui/ImputProduction";
import { useStore } from "@nanostores/react";
import {
  productionDashDataStore,
  initLoading,
} from "@/components/datastore/ProductionStore";
import CreateNewProduction from "./CreateNewProduction";
import Loading from "@/components/renderer/workplace/init/InitLoading";
import ProductionNav from "./Production-nav";

export default function DisplayAllProductions() {
  const data = useStore(productionDashDataStore);
  const progress = useStore(initLoading);
  if (initLoading.get() < 100) {
    return (
      <>
        <Loading progress={progress} />
      </>
    );
  }
  return (
    <>
      <CreateNewProduction />
      <ImputProduction production={data} />
      <ProductionNav cardData={data} />
    </>
  );
} //        <DisplayProductions data={data}/>
