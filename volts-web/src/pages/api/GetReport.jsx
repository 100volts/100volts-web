import React, { useState, useEffect } from 'react';
import pkg from "../../../package.json";


export default function GetReport(){
    const urladdress = pkg["volts-server"];
    const [data, seTableCellata] = useState([]);
    const userToken = localStorage.getItem('volts_token');
    const companyName = localStorage.getItem('company_name');
    const elMeterAddress = localStorage.getItem('electric_meter_address');

}