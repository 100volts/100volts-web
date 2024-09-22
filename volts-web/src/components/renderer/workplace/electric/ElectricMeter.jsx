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
      <div key={index}>
        {elmeter ? (
          <>
            <ScrollArea className="h-96">
              <Card className="flex w-full  justify-start flex-wrap flex-col md:flex-row p-5">
                <div>
                  <div className="flex flex-row justify-between">
                    <h2 style={{ padding: "5px" }}>
                      {elmeter.name} - {elmeter.address}
                    </h2>
                  </div>
                  <OptionsButtons address={elmeter.address} />
                </div>
                <div className="flex flex-rap  items-center">
                  <div className=" w-full">
                    <WeeklyEnergyChart data={elmeter.lastWeekEnergy} />
                  </div>
                  <AllElectricMeterDataTable elmeterProp={elmeter} />
                </div>
                <ElectricGraphs elmeterProp={elmeter} />
                <Card className="flex w-full max-w-full m-5">
                  <DayilyTatiff
                    className="flex w-full max-w-full "
                    elmeterProp={elmeter}
                  />
                </Card>
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
