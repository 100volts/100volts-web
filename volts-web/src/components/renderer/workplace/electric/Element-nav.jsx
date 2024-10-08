import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import ElectricSplashcreen from "@/components/renderer/workplace/electric/ElectricSplashScreen";
import DisplayMeter from "@/components/renderer/workplace/electric/ElectricMeter";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ElementNav({ cardData }) {
  const [dataState, setDataState] = useState();

  async function onSubmit(values) {
    if (cardData) {
      console.log("Clikerting", values.target.innerText);
      setDataState(
        cardData.filter((datag) => datag.name === values.target.innerText)[0]
      );
      console.log(
        "Filtering",
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
      <div className="flex    flex-row m-1">
        <div className=" ">
          <ScrollArea className="h-96 w-48 rounded-md border">
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
        <div className="flex w-full max-w-full">
          {cardData ? <DisplayMeter className="w-full" elmeter={dataState} index={1} /> : <></>}
        </div>
      </div>
    </>
  );
}
