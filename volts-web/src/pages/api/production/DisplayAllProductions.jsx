import React, { useState, useEffect } from "react";
import pkg from "../../../../package.json";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

const urladdress = pkg["volts-server"];


export default function DisplayAllProductions(){
    const [data, setProdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userToken = localStorage.getItem("volts_token");
    const companyName = localStorage.getItem("company_name");

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
        <div>
        {data.map((production, index) => (
            <div key={index}>
                <Card>
                    <CardHeader>{production.name}</CardHeader>
                    <CardContent>
                        <a>{production.description}</a>
                        <a>Date of creation:{production.dateOfCreation}</a>
                        <a>{production.units.name}</a>
                        <br></br>
                        <a>Groups:</a>
                        {production.groups.map((group, indexg) => (
                            <div key={indexg}>
                                <a>Name: {group.name}</a>
                                {group.electricMeters.map((electric, indexe) => (
                                    <div key={indexe}>
                                        <a>Electric meter name: {electric.meterName}</a>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        ))}
        </div>
        </>
      );
}