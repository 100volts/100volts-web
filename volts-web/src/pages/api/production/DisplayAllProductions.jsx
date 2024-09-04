"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import DeleteButton from "./ui/DeleteButton"
  import React, { useState, useEffect } from "react";
  import pkg from "../../../../package.json";
  import ImputProduction from "./ui/ImputProduction"
const urladdress = pkg["volts-server"];
import Last10DataTable from "./ui/Last10DataTable"
import YearlyProductionChart from "./ui/YearlyProductionChart"
const companyName = localStorage.getItem("company_name");
const userToken = localStorage.getItem("volts_token");


export default function DisplayAllProductions(){
    const [data, setProdData] = useState([]);
    const [groupedByMonth, setgroupedByMonth] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProdData = async () => {
        try {
          const body = JSON.stringify({
            company_name: companyName,
          });
          const response = await fetch(
            `http://${urladdress}:8081/production/company/all`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
              body,
            }
          );
          const datat = await response.json();
          const { production } = datat;    
    
          setProdData(production);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getProdData();
      }, []);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;
    
      return(
        <>
          <div className="imput_production">
            <ImputProduction production={data}/>
        </div>
        <div className="max-w-10xl">
        {data.map((production, index) => (
            <div key={index}>
                <Card >
                    <CardHeader>{production.name}</CardHeader>
                    <CardContent className="flex flex-col md:flex-row">
                      <div className=" w-full h-full">
                        <a>Description: {production.description}</a>
                        <br/>
                        <a>Units: {production.units.name}</a>
                        <a>Groups:</a>
                        {production.groups.map((group, index) => (
                            <div key={index}>
                                <a>{group.name}</a>
                            </div>
                        ))}
                        <br/>
                        <a>Electric Meters:</a>
                        {production.electricMeters.map((electricMeters, index) => (
                            <div key={index}>
                              
                                <a>Name:<br/> {electricMeters.meterName}</a>
                              
                            </div>
                        ))}
                        </div>
                        
                        <Last10DataTable className="max-w-xs" prodName={production.name}/>
                        
                        <DeleteButton production={production}/>
                    </CardContent>
                </Card>
            </div>
        ))}
        </div>
        </>
      );
}//<YearlyProductionChart/>