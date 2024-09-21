"use client"

import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card";
  import DeleteButton from "./ui/DeleteButton"
import Last10DataTable from "./ui/Last10DataTable"
import {initLoading} from "@/components/datastore/ProductionStore"
import OptionsButtons from "./ui/OptionsButtons"
import YearlyProductionChart from "./ui/YearlyProductionChart"
import Loading from "@/components/renderer/workplace/init/InitLoading"


export default function DisplayProductions({data}){
    if(initLoading.get()<100){
      return (<><Loading progress={progress}/></>)
    }
      return(
        <>
        <div className="max-w-10xl">
        {Object.entries(data).map(([key,production], index) => (
            <div key={index}>
                <Card >
                    <CardHeader>{production.name}</CardHeader>
                    <CardContent className="flex flex-col md:flex-row">
                      <div className=" w-full h-full">
                        <a>Discription: {production.description}</a>
                        <br/>
                        <a>Units: {production.units.name}</a><br/>
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
                        
                        <Last10DataTable className="max-w-xs" data={production.last10}/>

                        <YearlyProductionChart chartData={production.monthlyData}/>
                        <div  key={index}>
                          <OptionsButtons  production={production}/>
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