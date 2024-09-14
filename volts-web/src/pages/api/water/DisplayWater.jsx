import WatterDataTable from "./WatterDataTable"
import  BlackWaterMeter  from '@/components/black-water-meter'
import CreateNewWatterMeter from "./CreateNewWatterMeter"
import AddDataToWattermeter from "./AddDataToWattermeter"
import {waterDataPack,waterDataSum} from "@/pages/store/WaterStore"
import { useStore } from '@nanostores/react';

export default function DisplayWater(){
    const data=useStore(waterDataPack)
    console.log("waterDataPack.get()",data)

    if(data===undefined){
        return(<></>)
    }

    return(
    
    <>
        <div>
            <div>
                <CreateNewWatterMeter/>
                <AddDataToWattermeter/>
                <h2>Sum of Watter meter data as per last read</h2>
                <BlackWaterMeter initialValue={waterDataSum.get()}/>
                <h2>Sum of Watter meter data full</h2>
                <BlackWaterMeter initialValue={waterDataSum.get()}/>
            </div>
            <WatterDataTable/>
        </div>
    </>
    )
}