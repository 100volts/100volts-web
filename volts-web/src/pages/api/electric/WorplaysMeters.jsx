import DayilyTatiff from "../../../components/react/electric/DayilyTatiff";
import OptionsButtons from "../../../components/react/electric/OptionsButtons";
import ElectricGraphs from "../../../components/react/electric/ElectricGraphs";
import AllElectricMeterDataTable from "../../../components/react/electric/AllElectricMeterDataTable";
import {elMeterDashDataStore} from "@/pages/store/ElectricStore"
import { Card } from "@/components/ui/card";
import { useStore } from '@nanostores/react';


const ElmeterDataComponent = () => {
  const data=useStore(elMeterDashDataStore)

  return (
    <div className="flex flex-col">
      {Object.entries(data).map(([key,elmeter], index) => (
        <div key={index} >
          <div className="flex flex-row justify-between">
          <h2 style={{ padding: "10px" }}>
            {elmeter.name} - {elmeter.address} 
          </h2>
          <OptionsButtons address={elmeter.address} />
          </div>
          <div
            className="flex  flex-col md:flex-row flex-wrap max-w-full  justify-evenly"
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              className="flex flex-col md:flex-row w-full flex-wrap justify-evenly"
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "flex-start",
              }}
            >

            </div>
            <Card style={{ padding: "10px", margin: "10px" }}>
                <AllElectricMeterDataTable elmeterProp={elmeter} />
              </Card>
              <Card style={{ margin: "10px" }}>
                  <ElectricGraphs elmeterProp={elmeter} />
              </Card>
            <Card className="flex  max-w-full " style={{ margin: "10px" }} >
                <DayilyTatiff elmeterProp={elmeter} />
            </Card>
            <div className="max-w-[50%]" style={{ padding: "10px" }}></div>
          </div>
        </div>
      ))}
    </div>
  );
  // <pre>{JSON.stringify(elmeter.electric_meter_data, null, 2)}</pre>
};

export default ElmeterDataComponent;

//context for global
//state management

