import {useState} from 'react';
import { addElmeter, elmeters } from '../../src/pages/elmeterStore';
import { useStore } from '@nanostores/react';

export default function AddElMeter(){
    const [userElmeter, setUserElmeter]=useState('');
    const $elmeters = useStore(elmeters)

    return(
        <>
            <label htmlFor="Electric meter">Add Electric meter</label>
            <input type="text" name="elmeter" id="elmeter" onChange={(e)=> setUserElmeter(e.target.value)}/>
            <button onClick={()=>addElmeter(userElmeter)}>Add Electri meter</button>

            <ul>
                {
                    $elmeters.map((elmeter,index)=><li key={index}>{elmeter}</li>)
                }
            </ul>
        </>
    )
}