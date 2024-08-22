import React from "react";

export default function JoinNowCompo(){
    return (
        <div className="HomeSection5">
            <h1 className="heading">Ready to Transform Your Tech Hiring?</h1>
            <br />
            <p className="text HomeSection5-Text" >Discover how Rekruit Assess can help you build a stronger tech team!</p>
            <br />
            <div style={{display:"flex",gap:"25px"}}>
            <a href="/firm-onboarding"><button className="btn btn-1 btn-rounded HomeSection5-Btn">Get Started Now!</button></a>
            <a href="/firm-onboarding"><button className="btn btn-2 btn-rounded HomeSection5-Btn">Request a demo!</button></a>
            </div>
        </div>
    )
}