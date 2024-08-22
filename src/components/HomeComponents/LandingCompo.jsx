import React from "react";

export default function LandingCompo(){
    return (
        <div className="HomeSection1">
            <div style={{ display: "flex", flexDirection: "column", marginTop: "5%", marginRight: "10%" }}>
                <h1 className="sec-1-heading">Empower Your Tech Hiring with Rekruit Assess</h1>
                <br />
                <p className="sec-1-text">Streamline your recruitment process with our advanced tech test platform, designed to identify top talent efficiently</p>
                <br />
                <div>
                    <a href="#section-2"><button className="btn btn-1 btn-rounded">More About Us</button></a>
                    <a href="/firm-onboarding"><button className="btn btn-2 btn-rounded" style={{backgroundColor:"#001427",color:"white"}}>Get Started</button></a>
                </div>
            </div>
            <div>
                <img src="sec-1-img-1.png" style={{marginLeft:'5%', width: "90%",alignSelf:"end" }}></img>
            </div>
        </div>
    )
}