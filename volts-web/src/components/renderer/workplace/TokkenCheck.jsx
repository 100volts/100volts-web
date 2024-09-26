import { jwtDecode } from "jwt-decode";
import { useStore } from '@nanostores/react';
import { userData } from "@/components/datastore/UserStore";
import React,{ useEffect } from "react";

export default function TokkenCheck() {
    const $userData=useStore(userData);
    const token =$userData.tokken
    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            window.location.href = '/login';
        }
    },);
};

const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp < currentTime;  
    } catch (error) {
        return true; // If there's an error decoding, treat the token as expired
    }
};