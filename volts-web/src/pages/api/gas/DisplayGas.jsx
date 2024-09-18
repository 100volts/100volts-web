import WatterDataTable from "./GasDataTable"
import  BlackgasMeter  from '@/components/black-water-meter'
import CreateNewGasMeter from "./CreateNewGasMeter"
import AddDataToGasMeter from "./AddDataToGas"
import {gasDataPack,gasDataSum} from "@/pages/store/GasStore"
import { useStore } from '@nanostores/react';

export default function DisplayGas(){
    const data=useStore(gasDataPack)

    if(data===undefined){
        return(<></>)
    }

    return(
    
    <>
        <div>
            <div>
                <CreateNewGasMeter/>
                <AddDataToGasMeter/>
                <h2>Sum of Gas meter data as per last read</h2>
                <BlackgasMeter initialValue={gasDataSum.get()}/>
            </div>
            <WatterDataTable/>
        </div>
    </>
    )
}