import {useState} from 'react';
import { addElmeter, elmeters } from '../datastore/elmeterStore';
import { useStore } from '@nanostores/react'; 
import pkg from "../../../package.json";
const urladdress = pkg["volts-server"];


export default async function GetElMeterAdnDisplay(){
    const [userElmeter, setUserElmeter]=useState('');
    const $elmeters = useStore(elmeters)
    const $elmeters1 =useStore(await getElmeterData());
    return(
        <>
            <label htmlFor="Electric meter">Add Electric meter</label>
            <input type="text" name="elmeter" id="elmeter" onChange={(e)=> setUserElmeter(e.target.value)}/>
            <button onClick={()=>addElmeter(userElmeter)}>Add Electri meter</button>

            <ul>
                {
                    $elmeters1.map((elmeter,index)=><li key={index}>{elmeter}</li>)
                }
            </ul>
        </>
    )
}

async function getElmeterData() {
    try{
        const userToken = localStorage.getItem("volts_token");
        const companyName = localStorage.getItem("company_name");
        const response = await fetch(
          `http://${urladdress}:8081/elmeter/company/address/list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                company_name: companyName,
            }),
          },
        );
        const datat = await response.json();
        const {address_list}=datat;
        let componentArr=[]
        address_list.forEach(async element => {
            console.log(element)
            componentArr.push(await getElmeterDataFromAddress(element))
        });
        return componentArr
    }catch (error) {
        console.log('Failed to fetch data: ' + error.message);
    }
}

async function getElmeterDataFromAddress(elmeterAddress) {
    try{
        const userToken = localStorage.getItem("volts_token");
        const companyName = localStorage.getItem("company_name");
        const response = await fetch(
          `http://${urladdress}:8081/elmeter/data/last`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({
                company_name: companyName,
                address:elmeterAddress
            }),
          },
        );
        const datat = await response.json();
        const {name}=datat;
        /*
        let a = document.createElement("a");
        a.innerHTML = name;
        document.getElementById('elmeter').appendChild(a);
        document.getElementById('elmeter').appendChild(document.createElement("br"));

        console.log(datat)
        */
       return name
  
    }catch (error) {
        console.log('Failed to fetch data: ' + error.message);
    }
}