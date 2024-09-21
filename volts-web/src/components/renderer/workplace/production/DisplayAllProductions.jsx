"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import DeleteButton from "./ui/DeleteButton"
  import ImputProduction from "./ui/ImputProduction"
import { useStore } from '@nanostores/react';
import Last10DataTable from "./ui/Last10DataTable"
import {productionDashDataStore,initLoading} from "@/components/datastore/ProductionStore"
import OptionsButtons from "./ui/OptionsButtons"
import YearlyProductionChart from "./ui/YearlyProductionChart"
import CreateNewProduction from "./CreateNewProduction"
import Loading from "@/components/renderer/workplace/init/InitLoading"
import * as Progress from '@radix-ui/react-progress';
import DisplayProductions from "./DisplayProduction"

export default function DisplayAllProductions(){
    const data=useStore(productionDashDataStore);
    const progress=useStore(initLoading);
    if(initLoading.get()<100){
      return (<><Loading progress={progress}/></>)
    }
      return(
        <>
        <CreateNewProduction/>
        <ImputProduction production={Object.values(data)}/>
          <div className="imput_production">
           
        </div>
        <DisplayProductions data={data}/>
        </>
      );
}//