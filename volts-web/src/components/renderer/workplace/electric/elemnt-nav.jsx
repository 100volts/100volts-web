import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect }  from "react";
import DisplayMeter from "@/components/renderer/workplace/electric/ElectricMeter"

export default function ElementNav({cardData }) {
  const [dataState,setDataState]=  useState();
  
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
        <div className="flex w-full flex-col ">
        {cardData ? (
          
          cardData.map((data, index) => (
              <Card className="m-1" onClick={onSubmit}>
                <CardHeader>{data.name}</CardHeader>
                <CardDescription></CardDescription>
              </Card> 
          ))
        ) : (
          <a>No data</a>
        )}
        </div>
        <div className="flex flex-col w-full">
          {
            cardData?(<DisplayMeter elmeter={dataState} index={1}/>)
            :(<></>)
          }
        </div>
      </div>
    </>
  );
}
