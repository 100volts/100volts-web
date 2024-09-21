import DayilyTatiff from "@/components/renderer/workplace/electric/ui/DayilyTatiff";
import OptionsButtons from "@/components/renderer/workplace/electric/ui/OptionsButtons";
import ElectricGraphs from "@/components/renderer/workplace/electric/ui/ElectricGraphs";
import AllElectricMeterDataTable from "@/components/renderer/workplace/electric/ui/AllElectricMeterDataTable";
import {
  elMeterDashDataStore,
  initLoading,
} from "@/components/datastore/ElectricStore";
import { Card } from "@/components/ui/card";
import { useStore } from "@nanostores/react";
import WeeklyEnergyChart from "@/components/renderer/dashboard/WeeklyEnergyChart";
import CreateNewElectricMeter from "./CreateNewElectricMeter";
import Loading from "@/components/renderer/workplace/init/InitLoading";

export default function ElectricMeter({ elmeter, index }) {
  return (
    <>
      <div key={index}>
        {elmeter ? (
          <>
            <div className="flex flex-row justify-between">
              <h2 style={{ padding: "10px" }}>
                {elmeter.name} - {elmeter.address}
              </h2>
            </div>

            <OptionsButtons address={elmeter.address} />
            <Card
              className="flex  flex-wrap flex-row"
              style={{ padding: "10px", margin: "10px" }}
            >
              <div className="flex flex-nowrap  items-center">
                <div
                  style={{ padding: "10px", margin: "10px" }}
                  className=" w-full"
                >
                  <WeeklyEnergyChart data={elmeter.lastWeekEnergy} />
                </div>
                <AllElectricMeterDataTable
                  style={{ padding: "10px", margin: "10px" }}
                  elmeterProp={elmeter}
                />
              </div>
              <ElectricGraphs elmeterProp={elmeter} />
            </Card>
            <Card className="flex  max-w-full " style={{ margin: "10px" }}>
              <DayilyTatiff elmeterProp={elmeter} />
            </Card>
            <div className="max-w-[50%]" style={{ padding: "10px" }}></div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
