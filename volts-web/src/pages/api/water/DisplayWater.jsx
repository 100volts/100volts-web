import WatterDataTable from "./WatterDataTable"
import  BlackWaterMeter  from '@/components/black-water-meter'
import CreateNewWatterMeter from "./CreateNewWatterMeter"
import AddDataToWattermeter from "./AddDataToWattermeter"
import {waterDataPack,waterDataSum} from "@/pages/store/WaterStore"
import { useStore } from '@nanostores/react';

export default function DisplayWater(){
    const data=useStore(waterDataPack)
    if(data===undefined){
        return(<></>)
    }
    //<h2>Sum of Water meter data full</h2>
    //<BlackWaterMeter initialValue={waterDataSum.get()}/>
    return(
    
    <>
        <div>
            <div>
                <CreateNewWatterMeter/>
                <AddDataToWattermeter/>
                <h2>Sum of Water meter data as per last read</h2>
                <BlackWaterMeter initialValue={waterDataSum.get()}/>

            </div>
            <WatterDataTable/>
        </div>
    </>
    )
}