"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DeleteButton from "./ui/DeleteButton";
import Last10DataTable from "./ui/Last10DataTable";
import OptionsButtons from "./ui/OptionsButtons";
import YearlyProductionChart from "./ui/YearlyProductionChart";
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge"
import ElectricMeterSlider from "@/components/ui/elmeter-card-view"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const testDataElectricMeters123 = [
  { id: 1, reading: 45678, lastUpdated: "2023-05-15" },
  { id: 2, reading: 34567, lastUpdated: "2023-05-14" },
  { id: 3, reading: 56789, lastUpdated: "2023-05-13" },
  { id: 4, reading: 23456, lastUpdated: "2023-05-12" },
  { id: 5, reading: 78901, lastUpdated: "2023-05-11" },
  { id: 6, reading: 12345, lastUpdated: "2023-05-10" },
]

export default function DisplayProductions({ production }) {
  if (production && production.units) {
    return (
      // /            <h1>{production.name}</h1>
      //Groups:  
      <>
      <ScrollArea className="h-screen max-h-[700px]">
      <Separator />
        <div className="h-full flex w-full flex-wrap justify-start p-5">
          <div  className="w-full" key={production.name}>
          <h2 style={{ padding: "5px" }}>{production.name}</h2>
          <div className="flex flex-row justify-cente  content-start justify-items-center" key={production.name}>

              {production.groups.map((group, index) => (
                          <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                    <div key={index}>
                      <Badge variant="outline">{group.name}</Badge>
                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Group</p>
                                  </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>
                  ))}
                  </div>
            <Separator className="m-1" />
            <div className="flex flex-row justify-cente  content-start justify-items-center" key={production.name}>
                  <OptionsButtons production={production} />
                  <DeleteButton production={production} />
            </div>
            <div className="h-full m-1 p-1">
              <a className="flex flex-col md:flex-row">
                <div>
                  <ElectricMeterSlider electricMeters={testDataElectricMeters123}></ElectricMeterSlider>
                </div>
                <div  className="p-1 m-1"></div>
                <Last10DataTable
                  data={production.last10}
                />
                <div  className="p-1 m-1"></div>
                <YearlyProductionChart
                  chartData={production.monthlyData}
                />
              </a>
            </div>
          </div>
        </div>
        </ScrollArea>
      </>
    );
  }
}

/*
Old display description and electric meters 
                <div className="w-full h-full">
                  <a>
                    Discription:
                    <br /> {production.description}
                  </a>
                  <br />
                  <a>Units: {production.units.name}</a>
                  <br />
                  <br />
                  <a>Electric Meters:</a>
                  {production.electricMeters.map((electricMeters, index) => (
                    <div key={index}>
                      <a>
                        Name:
                        <br /> {electricMeters.meterName}
                      </a>
                    </div>
                  ))}
                </div>

*/