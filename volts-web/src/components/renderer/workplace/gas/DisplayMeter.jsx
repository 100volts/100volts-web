import DeleteButton from "./DeleteButton";
import ReportButton from "./GetReport"
import Settings from "./Settings";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import GasDataTable from "./GasDataTable"

export default function gasMeter({ gasmeter, index }) {
    console.log("gasmeter",gasmeter)
  return (
    <>
      <div key={index}>
        {gasmeter ? (
          <>
            <ScrollArea className="h-96">
              <Card className=" flex flex-wrap justify-start p-5">
                <div className="first row">
                  <div className="name-and-options">
                    <div>
                      <h2 style={{ padding: "5px" }}>
                        {gasmeter.name} 
                      </h2>
                    </div>
                    <div className="flex">
                    <DeleteButton gas={gasmeter.name}/>
                    <ReportButton meter={gasmeter.name}/>
                    <Settings meter={gasmeter.name} />
                    </div>
                  </div>
                  <div className="flex w-full flex-row">
                  <ScrollArea className="h-64">
                    {gasmeter.data?(<GasDataTable data={gasmeter.data}/> )
                    :(
                      <>
                        <a>No data</a>
                      </>)}
                    
                    </ScrollArea>
                  </div>
                </div>
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
//<GasDataTable data={gasmeter.data}/> 