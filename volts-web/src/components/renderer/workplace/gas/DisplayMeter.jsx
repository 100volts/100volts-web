import DeleteButton from "./DeleteButton";
import ReportButton from "./GetReport"
import Settings from "./Settings";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from '@nanostores/react';

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
                    <DeleteButton gas={gasmeter.name}/>
                    <ReportButton meter={gasmeter.name}/>
                    <Settings meter={gasmeter.name} />
                  </div>
                  <div className="flex flex-row">

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
