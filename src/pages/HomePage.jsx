import React from "react";
import LandingCompo from "../components/HomeComponents/LandingCompo";
import Section2 from "../components/HomeComponents/Section2";
import Section3 from "../components/HomeComponents/Section3";
import Section4 from "../components/HomeComponents/Section4";
import JoinNowCompo from "../components/HomeComponents/JoinNowCompo";
import '../Styles/HomeStyles.css'
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

export default function HomePage({currentUser}){
    return (
        <div style={{ display: "flex", flexDirection: "column", width: "100%", color: "white" }}>
            <Navbar currentUser={currentUser}/>
            <LandingCompo/>
            
            <Section2/>
            
            <Section3/>
            
            <Section4/>
            
            <JoinNowCompo/>
            <Footer/>
        </div>
    )
}