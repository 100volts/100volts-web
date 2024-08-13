import { atom } from "nanostores";

export const elmeters=atom([]);

export function addElmeter(elmeter){
    elmeters.set([...elmeters.get(),elmeter]);
    console.log('added meter',elmeters.get())
}