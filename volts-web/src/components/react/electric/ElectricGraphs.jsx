import Example from "../../../pages/chart/ExampleChart";

export default function ElectricGraphs({ elmeterProp }) {
  const dataVoltage = [{ name: "A", value: 240, color: "#011F26" }];
  const dataCurent = [
    { name: "A", value: 100, color: "#011F26" },
    { name: "B", value: 250, color: "#025E73" },
    { name: "C", value: 50, color: "#F2A71B" },
  ];
  const dataPower = [
    { name: "A", value: 20, color: "#011F26" },
    { name: "B", value: 65, color: "#025E73" },
    { name: "C", value: 15, color: "#F2A71B" },
  ];
  const dataG = [
    { name: "A", value: 35, color: "#011F26" },
    { name: "B", value: 35, color: "#025E73" },
    { name: "C", value: 25, color: "#F2A71B" },
  ];
  return (
    <>
      <div
        className="pie_chart_with_needle flex flex-col md:flex-row"
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "flex-start",
        }}
      >
        <Example
          niddleValue={elmeterProp.electric_meter_avr_data.voltage}
          data={dataVoltage}
          chartName={"Voltage"}
        />
        <Example
          niddleValue={elmeterProp.electric_meter_avr_data.current}
          data={dataCurent}
          chartName={"Curent"}
        />
        <Example
          niddleValue={elmeterProp.electric_meter_avr_data.power / 1000}
          data={dataPower}
          chartName={"Power"}
        />
        <Example
          niddleValue={elmeterProp.electric_meter_avr_data.powerFactor}
          data={dataG}
          chartName={"Power Factor"}
        />
      </div>
    </>
  );
}
