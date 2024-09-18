import { jwtDecode } from "jwt-decode";
import { useStore } from '@nanostores/react';
import {userData } from "@/components/datastore/UserStore";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TokkenCheck() {
    //const navigate = useNavigate();
    const $userData=useStore(userData);
    const token =$userData.tokken
    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            //navigate("/login");
            window.location.href = '/login';
        }
    },);// [navigate]);
    console.log("Logout working")
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