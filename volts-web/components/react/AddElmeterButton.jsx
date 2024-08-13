import {useState} from 'react';
import { addElmeter } from '../../src/pages/elmeterStore';

export default function AddElMeter(){
    const [userElmeter, setUserElmeter]=useState('');

    return(
        <>
            <label htmlFor="Electric meter">Add Electric meter</label>
            <input type="text" name="elmeter" id="elmeter" onChange={(e)=> setUserElmeter(e.target.value)}/>
            <button onClick={()=>addElmeter(userElmeter)}>Add Electri meter</button>
        </>
    )
}