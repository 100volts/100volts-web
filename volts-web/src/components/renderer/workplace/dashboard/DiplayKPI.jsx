import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import KpiChart from "./kpiChart";

export default function DisplayKPI({ kpiData, index }) {
  console.log("kpiData for displayKIPI", kpiData);
  if (kpiData) {
    return (
      <>
        <ScrollArea className="h-screen max-h-[700px]">
          <div className="w-full" key={index}>
            <div className="h-full">
              <div className="flex w-full flex-wrap justify-start p-5">
                <div className="first row w-full">
                  <div className="name-and-options">
                    <h1>{kpiData.name}</h1>
                    <p>{kpiData.description}</p>
                    <div className="w-full">
                      {kpiData.kpiDataDTOS ? (
                        <KpiChart chartData={kpiData.kpiDataDTOS} />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
          </div>
        </ScrollArea>
      </>
    );
  }
}
