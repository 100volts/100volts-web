import pkg from "../../../../package.json";
const urladdress = pkg["volts-server"];
import { isLogedIn,userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';


export default async function getElmeterData() {
  const $userData=useStore(userData);
  console.log("Prod: userData",userData);
  console.log("Prod: $userData",$userData)
  const userToken =$userData.tokken
  try {
    //const userToken = localStorage.getItem("volts_token");
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
      }
    );
    const datat = await response.json();
    const { address_list } = datat;

    address_list.forEach((element) => {
      console.log(element);
      getElmeterDataFromAddress(element);
    });
  } catch (error) {
    console.log("Failed to fetch data: " + error.message);
  }
}

async function getElmeterDataFromAddress(elmeterAddress) {
  try {
    //const userToken = localStorage.getItem("volts_token");
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
          address: elmeterAddress,
        }),
      }
    );
    const datat = await response.json();
    const { name, address, electric_meter_data } = datat;
    const {
      merterId,
      voltagell1,
      voltagell2,
      voltagell3,
      currentl1,
      currentl2,
      currentl3,
      activepowerl1,
      activepowerl2,
      activepowerl3,
      pfl1,
      pfl2,
      pfl3,
      totalActivePpower,
      totalActiveEnergyImportTariff1,
      totalActiveEnergyImportTariff2,
    } = electric_meter_data;
    let a = document.createElement("a");
    a.innerHTML = `<h2>${name} Address: ${address}</h2> <br>
        <table>
        <tr><td>Name</td><td>L1</td><td>L2</td><td>L3</td></tr>
        <tr><td>Voltage:</td><td>${voltagell1}</td><td>${voltagell2}</td><td>${voltagell3}</td><td>V</td></tr>
        <tr><td>Curent:</td><td>${currentl1}</td><td>${currentl2}</td><td>${currentl3}</td><td>A</td></tr>
        <tr><td>Active Power</td><td>${activepowerl1}</td><td>${activepowerl2}</td><td>${activepowerl3}</td>W</tr>
        <tr><td>Pfl1</td><td>${pfl1}</td><td>${pfl2}</td><td>${pfl3}</td></tr>
        <tr><td>Total Active Power: </td><td>${totalActivePpower}</td></tr>
        <tr><td>Total Active Energy: </td><td>${totalActiveEnergyImportTariff1}</td></tr>
        </table>

        `;
    document.getElementById("elmeter").appendChild(a);
    document
      .getElementById("elmeter")
      .appendChild(document.createElement("br"));
    document
      .getElementById("elmeter")
      .appendChild(document.createElement("br"));

    console.log(datat);
  } catch (error) {
    console.log("Failed to fetch data: " + error.message);
  }
}

await getElmeterData();
