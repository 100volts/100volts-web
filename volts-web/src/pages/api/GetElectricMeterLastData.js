import { useStore } from '@nanostores/react'; 
import pkg from "../../../package.json";
const urladdress = pkg["volts-server"];

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
        
        address_list.forEach(element => {
            console.log(element)
            getElmeterDataFromAddress(element)
        });
        
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
        const {name}=datat
        let a = document.createElement("a");
        a.innerHTML = name;
        document.getElementById('elmeter').appendChild(a);
        document.getElementById('elmeter').appendChild(document.createElement("br"));

        console.log(datat)
        
    }catch (error) {
        console.log('Failed to fetch data: ' + error.message);
    }
}

await getElmeterData();