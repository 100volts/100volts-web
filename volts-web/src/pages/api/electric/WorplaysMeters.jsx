import React, { useState, useEffect } from "react";
import pkg from "../../../../package.json";
import DayilyTatiff from "../../../components/react/electric/DayilyTatiff";
import OptionsButtons from "../../../components/react/electric/OptionsButtons";
import ElectricGraphs from "../../../components/react/electric/ElectricGraphs";
import AllElectricMeterDataTable from "../../../components/react/electric/AllElectricMeterDataTable";
import {elMeterDashDataStore} from "@/pages/store/ElectricStore"
import { Card } from "@/components/ui/card";
import {userData } from "@/pages/store/userStore";
import { useStore } from '@nanostores/react';


const ElmeterDataComponent = () => {
  const data=useStore(elMeterDashDataStore)

  return (
    <div style={{ maxWidth: "70%" }}>
      {Object.entries(data).map(([key,elmeter], index) => (
        <div key={index}>
          <h2 style={{ padding: "10px" }}>
            {elmeter.name} - {elmeter.address}
          </h2>
          <div
            className="flex flex-col md:flex-row"
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "flex-start",
            }}
          >
            <div
              className="flex flex-col md:flex-row"
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "flex-start",
              }}
            >
              <Card style={{ padding: "10px", margin: "10px" }}>
                <AllElectricMeterDataTable elmeterProp={elmeter} />
              </Card>
              <div style={{ padding: "10px" }}>
                <Card>
                  <ElectricGraphs elmeterProp={elmeter} />
                </Card>
                <Card>
                  <DayilyTatiff elmeterProp={elmeter} />
                </Card>
              </div>
            </div>
            <OptionsButtons address={elmeter.address} />
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

