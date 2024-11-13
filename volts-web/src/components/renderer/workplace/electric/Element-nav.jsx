import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useState, useEffect } from "react";
import DisplayMeter from "@/components/renderer/workplace/electric/ElectricMeter";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ElementNav({ cardData }) {
  const [dataState, setDataState] = useState();
  async function onSubmit(values) {
    if (cardData) {
      setDataState(
        cardData.filter((datag) => datag.name === values.target.innerText)[0]
      );
    }
  }
  const handleDataChange = async (event) => {
    event.preventDefault();
    form.handleSubmit(onSubmit)(event.target.key);
  };

  useEffect(() => {
    if (cardData) {
      setDataState(cardData[0]);
    }
  }, []);
  return (
    <>
    <ResizablePanelGroup direction="horizontal" > 
      <div className="flex flex-row max-h-[700px]  m-1">
      <ResizablePanel defaultSize={10} 
          minSize={15}
          maxSize={45}
      >
        <div className="flex flex-col">
        <ScrollArea className="h-screen max-h-[700px]">
            {cardData ? (
              cardData.map((data, index) => (
                <Card key={index} className="m-1" onClick={onSubmit}>
                  <CardHeader>{data.name}</CardHeader>
                  <CardDescription></CardDescription>
                </Card>
              ))
            ) : (
              <a>No data</a>
            )}
          </ScrollArea>
        </div>
        </ResizablePanel>
        <ResizableHandle  withHandle/>
        <ResizablePanel defaultSize={90}
                    minSize={15}
                    maxSize={95}
        >
        <div className="flex max-h-[700px] ">
          {cardData ? <DisplayMeter elmeter={dataState} index={1} /> : <></>}
        </div>
        </ResizablePanel>
      </div>
      </ResizablePanelGroup>
    </>
  );
}
