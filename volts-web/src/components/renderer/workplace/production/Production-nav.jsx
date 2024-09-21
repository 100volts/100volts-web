import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect }  from "react";
import DisplayProductions from "./DisplayProduction"
import { ScrollArea } from "@/components/ui/scroll-area"


export default function ProductionNav({cardData }) {
  const [dataState,setDataState]=  useState();
  console.log("cardData",cardData)
  async function onSubmit(values) {
    if(cardData){
      console.log("Clikerting",values.target.innerText)
      setDataState(cardData.filter(datag=>datag.name===values.target.innerText)[0])
      console.log("Filtering",cardData.filter(datag=>datag.name===values.target.innerText)[0])
    }
  }
  const handleDataChange = async (event) => {
    event.preventDefault()
    form.handleSubmit(onSubmit)(event.target.key);
  };  

  useEffect(() => {
    if(cardData){
      setDataState(cardData[0])
    }
  }, []);
  return (
    <>
      <div className="flex flex-row m-1">
        <div className="flex flex-col ">
        {cardData ? (
          <ScrollArea className="h-72 w-48 rounded-md border">
            {
          cardData.map((data, index) => (
              <Card className="m-1" onClick={onSubmit}>
                <CardHeader>{data.name}</CardHeader>
                <CardDescription></CardDescription>
              </Card> 
          ))}
          </ScrollArea>
        ) : (
          <a>No data</a>
        )}
        </div>
        <div className="flex w-full flex-start">
          {
            cardData?(<DisplayProductions production={dataState}/>)
            :(<></>)
          }
        </div>
      </div>
    </>
  );
}
