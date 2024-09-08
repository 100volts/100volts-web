import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import React, { useState, useEffect } from "react";
  import pkg from "../../../../../package.json";

  export default function Last10DataTable({prodName}){
    const urladdress = pkg["volts-server"];
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    if(localStorage.getItem("company_name")){
    const userToken = localStorage.getItem("volts_token");
    const companyName = localStorage.getItem("company_name");

    const getProdData = async () => {
        try {
          const body = JSON.stringify({
            company_name: companyName,
            production_name: prodName
          });
          const response = await fetch(
            `http://${urladdress}:8081/production/company/data/pack`,
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
          const { last10 } = datat;    
          
          setData(last10);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getProdData();
      }, []);
    }
      //if (loading) return <div>Loading...</div>;
      //if (error) return <div>Error: {error}</div>;
    

    return(
        <Table className="max-w-xs">
            <TableCaption>All data.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead >Value</TableHead>
                <TableHead>Date</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {data && data.length > 0 ? (
                <>
                {data.map((prodData,index) => (
                <TableRow key={index}>
                    <TableCell >{prodData.values}</TableCell>
                    <TableCell>{prodData.date}</TableCell>
                </TableRow>
                ))}

            </>
            ) : (
                <>
                <TableRow className="text-center"><TableCell>No new reads for doday</TableCell></TableRow>
                </>
            )}
            </TableBody>
        </Table>
    )
  }

