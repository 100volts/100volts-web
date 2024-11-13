import NeedleGraphics from "@/pages/chart/NeedleGraphic";

export default function ElectricGraphs({ elmeterProp }) {
  const dataVoltage = [{ name: "A", value: 240, color: "#011F26" }];
  const dataCurent = [
    { name: "Low value", value: 100, color: "#011F26" },
    { name: "Operation value", value: 250, color: "#025E73" },
    { name: "High value", value: 50, color: "#F2A71B" },
  ];
  const dataPower = [
    { name: "Low value", value: 20, color: "#011F26" },
    { name: "Operation value", value: 65, color: "#025E73" },
    { name: "High value", value: 15, color: "#F2A71B" },
  ];
  const dataG = [
    { name: "Low value", value: 35, color: "#011F26" },
    { name: "Operation value", value: 35, color: "#025E73" },
    { name: "High value", value: 25, color: "#F2A71B" },
  ];
  return (
    <>
      <div className="flex justify-center ml-3">
        <div
          className="pie_chart_with_needle flex d:flex-col flex-row ml-8"
          style={{
            display: "flex",
            justifyItems: "center",
            alignItems: "flex-start",
          }}
        >
          {elmeterProp.electric_meter_avr_data ? (
            <>
              <NeedleGraphics
                niddleValue={elmeterProp.electric_meter_avr_data.voltage}
                data={dataVoltage}
                chartName={"Voltage"}
              />

              <NeedleGraphics
                niddleValue={elmeterProp.electric_meter_avr_data.current}
                data={dataCurent}
                chartName={"Curent"}
              />
              <NeedleGraphics
                niddleValue={elmeterProp.electric_meter_avr_data.power / 1000}
                data={dataPower}
                chartName={"Power"}
              />
              <NeedleGraphics
                niddleValue={elmeterProp.electric_meter_avr_data.powerFactor}
                data={dataG}
                chartName={"Power Factor"}
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
