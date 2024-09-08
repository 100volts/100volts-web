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
  import React, { useState, useEffect } from "react";
  import pkg from "../../../../package.json";
  import ImputProduction from "./ui/ImputProduction"
const urladdress = pkg["volts-server"];
import { useStore } from '@nanostores/react';
import Last10DataTable from "./ui/Last10DataTable"
import {productionDashDataStore} from "@/pages/store/ProductionStore"
import OptionsButtons from "./ui/OptionsButtons"
import YearlyProductionChart from "./ui/YearlyProductionChart"
import CreateNewProduction from "./CreateNewProduction"


export default function DisplayAllProductions(){
    const data=useStore(productionDashDataStore);
    console.log("prod data",data);
      return(
        <>
          <div className="imput_production">
            <ImputProduction production={Object.values(data)}/>
        </div>
        <div className="max-w-10xl">
        {Object.entries(data).map(([key,production], index) => (
            <div key={index}>
                <Card >
                    <CardHeader>{production.name}</CardHeader>
                    <CardContent className="flex flex-col md:flex-row">
                      <div className=" w-full h-full">
                        <a>Discription: {production.description}</a>
                        <br/>
                        <a>Units: {production.units.name}</a>
                        <a>Groups:</a>
                        {production.groups.map((group, index) => (
                            <div key={index}>
                                <a>{group.name}</a>
                            </div>
                        ))}
                        <br/>
                        <a>Electric Meters:</a>
                        {production.electricMeters.map((electricMeters, index) => (
                            <div key={index}>
                              
                                <a>Name:<br/> {electricMeters.meterName}</a>
                              
                            </div>
                        ))}
                        </div>
                        
                        <Last10DataTable className="max-w-xs" prodName={production.name}/>

                        <YearlyProductionChart chartData={production.monthlyData}/>
                        <div  key={index}>
                        <OptionsButtons  productionName={production.name}/>
                        <DeleteButton production={production}/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        ))}
        </div>
        </>
      );
}//