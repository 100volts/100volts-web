import  BlackgasMeter  from '@/components/black-water-meter'
import CreateNewGasMeter from "./button/CreateNewGasMeter"
import AddDataToGasMeter from "./button/AddDataToGas"
import {gasDataPack,gasDataSum} from "@/components/datastore/GasStore"
import { useStore } from '@nanostores/react';
import ElementNav from "./Gas-nav"

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
            <ElementNav cardData={data} />
        </div>
    </>
    )
    //<WatterDataTable/>
}