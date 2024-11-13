import OptionsButtons from "@/components/renderer/workplace/electric/ui/OptionsButtons";
import ElectricGraphs from "@/components/renderer/workplace/electric/ui/ElectricGraphs";
import AllElectricMeterDataTable from "@/components/renderer/workplace/electric/ui/AllElectricMeterDataTable";
import WeeklyEnergyChart from "@/components/renderer/dashboard/WeeklyEnergyChart";
import { Separator } from "@/components/ui/separator"


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
                        <WeeklyEnergyChart data={elmeter.lastWeekEnergy} />
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
