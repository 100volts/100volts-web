import DayilyTatiff from "@/components/renderer/workplace/electric/ui/DayilyTatiff";
import OptionsButtons from "@/components/renderer/workplace/electric/ui/OptionsButtons";
import ElectricGraphs from "@/components/renderer/workplace/electric/ui/ElectricGraphs";
import AllElectricMeterDataTable from "@/components/renderer/workplace/electric/ui/AllElectricMeterDataTable";
import { Card } from "@/components/ui/card";
import WeeklyEnergyChart from "@/components/renderer/dashboard/WeeklyEnergyChart";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ElectricMeter({ elmeter, index }) {
  return (
    <>
      <div  className=" w-full" key={index}>
        {elmeter ? (
          <>
            <ScrollArea className="h-96">
              <Card className=" flex w-full flex-wrap justify-start p-5">
                <div className="first w-full row">
                  <div className="name-and-options">
                    <div>
                      <h2 style={{ padding: "5px" }}>
                        {elmeter.name} - {elmeter.address}
                      </h2>
                    </div>
                    <OptionsButtons address={elmeter.address} />
                  </div>
                  <div className="flex flex-row">
                    <div className="w-full">
                      <WeeklyEnergyChart data={elmeter.lastWeekEnergy} />
                    </div>
                    <AllElectricMeterDataTable elmeterProp={elmeter} />
                  </div>
                  <ElectricGraphs elmeterProp={elmeter} />
                </div>
              </Card>
            </ScrollArea>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
/*add after fixing 15 min read
                <div className="max-w-full">
                  <DayilyTatiff elmeterProp={elmeter} />
                </div>

                */
