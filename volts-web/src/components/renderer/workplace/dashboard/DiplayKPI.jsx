import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import KpiChart from "./kpiChart";
import DeleteButton from "./DeleteKPIButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import OptionsButtons from "./OptionsButtons";
import ProductionTable from "./ui/KpiProductionTable";
import EnergyTable from "./ui/KpiEnergyTable";

export default function DisplayKPI({ kpiData, index }) {
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
                    <div className="pb-2">
                      {" "}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div key={index}>
                              <Badge variant="outline">{kpiData.group}</Badge>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Group</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Separator />
                    <div className="justify-cente flex flex-row content-start justify-items-center pt-2">
                      <DeleteButton kpi={kpiData} />
                      <OptionsButtons kpi={kpiData} />
                    </div>
                    <div className="w-full">
                      {kpiData.kpiDataDTOS ? (
                        <div className="justify-cente flex flex-row content-start justify-items-center">
                          <KpiChart chartData={kpiData.kpiDataDTOS} />
                          <ProductionTable data={kpiData.productionDTO} />
                          <EnergyTable data={kpiData.energy} />
                        </div>
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
