import OptionsButtons from "@/components/renderer/workplace/electric/ui/OptionsButtons";
import ElectricGraphs from "@/components/renderer/workplace/electric/ui/ElectricGraphs";
import AllElectricMeterDataTable from "@/components/renderer/workplace/electric/ui/AllElectricMeterDataTable";
import WeeklyEnergyChart from "@/components/renderer/dashboard/WeeklyEnergyChart";
import WeekklyElectricLineChrt from "@/components/renderer/dashboard/WeeklyElectricLineChart";

import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function ElectricMeter({ elmeter, index }) {
  if (elmeter) {
    return (
      <>
        <div  className="w-full" key={index}>
            <div className="h-full">
                <div className=" flex w-full flex-wrap justify-start p-5">
                  <div className="first w-full row">
                    <div className="name-and-options">
                      <div>
                        <h2 style={{ padding: "5px" }}>
                          {elmeter.name} - {elmeter.address}
                        </h2>
                      </div>
                      <Separator className="m-1" />
                      <OptionsButtons elmeter={elmeter} />
                    </div>
                    <div className="flex flex-row">
                      <div className="w-full">
                        <Tabs defaultValue="barChart">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="barChart">Bar chart</TabsTrigger>
                            <TabsTrigger value="lineChart">Line chart</TabsTrigger>
                          </TabsList>
                          <TabsContent value="barChart">
                            <WeeklyEnergyChart data={elmeter.lastWeekEnergy} />
                          </TabsContent>
                          <TabsContent value="lineChart">
                            <WeekklyElectricLineChrt data={elmeter.lastWeekEnergy} />
                          </TabsContent>
                        </Tabs>
                      </div>
                      <AllElectricMeterDataTable elmeterProp={elmeter} />
                    </div>
                    <ElectricGraphs className="mr-2" elmeterProp={elmeter} />
                  </div>
                </div>
              </div>
              <Separator />
        </div>
      </>
    );
  }
}
/*add after fixing 15 min read
                <div className="max-w-full">
                  <DayilyTatiff elmeterProp={elmeter} />
                </div>

                */
