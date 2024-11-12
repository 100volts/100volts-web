"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DeleteButton from "./ui/DeleteButton";
import Last10DataTable from "./ui/Last10DataTable";
import OptionsButtons from "./ui/OptionsButtons";
import YearlyProductionChart from "./ui/YearlyProductionChart";

export default function DisplayProductions({ production }) {
  if (production) {
    return (
      <>
        <div className="flex h-full w-full">
          <div key={production.name}>
            <Card className="h-full">
              <CardHeader>{production.name}</CardHeader>
              <CardContent className="flex flex-col md:flex-row">
                <div className=" w-full h-full">
                  <a>
                    Discription:
                    <br /> {production.description}
                  </a>
                  <br />
                  <a>Units: {production.units.name}</a>
                  <br />
                  <a>Groups:</a>
                  {production.groups.map((group, index) => (
                    <div key={index}>
                      <a>{group.name}</a>
                    </div>
                  ))}
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
                <Last10DataTable
                  className="flex w-full"
                  data={production.last10}
                />
                <YearlyProductionChart
                  className="w-full"
                  chartData={production.monthlyData}
                />
                <div key={production.name}>
                  <OptionsButtons production={production} />
                  <DeleteButton production={production} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }
}
