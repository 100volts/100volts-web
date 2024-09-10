import DayilyTatiff from "../../../components/react/electric/DayilyTatiff";
import OptionsButtons from "../../../components/react/electric/OptionsButtons";
import ElectricGraphs from "../../../components/react/electric/ElectricGraphs";
import AllElectricMeterDataTable from "../../../components/react/electric/AllElectricMeterDataTable";
import {elMeterDashDataStore,initLoading} from "@/pages/store/ElectricStore"
import { Card } from "@/components/ui/card";
import { useStore } from '@nanostores/react';
import WeeklyEnergyChart from "@/components/react/dashboard/WeeklyEnergyChart"
import Loading from "@/pages/wokrplace1/InitLoading"

const ElmeterDataComponent = () => {
  const data=useStore(elMeterDashDataStore)

  const data1=[
    {
      date: "2024-01-01",
      steps: 2000,
    },
    {
      date: "2024-01-02",
      steps: 2100,
    },
    {
      date: "2024-01-03",
      steps: 2200,
    },
    {
      date: "2024-01-04",
      steps: 1300,
    },
    {
      date: "2024-01-05",
      steps: 1400,
    },
    {
      date: "2024-01-06",
      steps: 2500,
    },
    {
      date: "2024-01-07",
      steps: 1600,
    },
  ]
  if(initLoading.get()<100){
    return (<><Loading progress={initLoading.get()}/></>)
  }
  return (
    <div className="flex flex-col">
      {Object.entries(data).map(([key,elmeter], index) => (
        <div key={index} >
          <div className="flex flex-row justify-between">
          <h2 style={{ padding: "10px" }}>
            {elmeter.name} - {elmeter.address} 
          </h2>
          </div>

            <OptionsButtons address={elmeter.address} />
            <Card className="flex  flex-wrap flex-row" style={{ padding: "10px", margin: "10px" }}>
              <div  className="flex flex-nowrap  items-center">
                  <div style={{ padding: "10px", margin: "10px" }} className=" w-full">
                    <WeeklyEnergyChart  data={elmeter.lastWeekEnergy}/>
                  </div>
                <AllElectricMeterDataTable style={{ padding: "10px", margin: "10px" }} elmeterProp={elmeter} />
              </div>
              <ElectricGraphs elmeterProp={elmeter} />
            </Card>
            <Card className="flex  max-w-full " style={{ margin: "10px" }} >
                <DayilyTatiff elmeterProp={elmeter} />
            </Card>
            <div className="max-w-[50%]" style={{ padding: "10px" }}></div>
        </div>
      ))}
    </div>
  );
};

export default ElmeterDataComponent;

