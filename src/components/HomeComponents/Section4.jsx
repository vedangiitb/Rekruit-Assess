import React from "react";

export default function Section4() {
    return (
        <div className="HomeSection4">
            <h1 className="sec-4-heading">Other Important features of Rekruit Assess</h1>

            <div className="card w-75 sec-4-card" style={{backgroundColor:"#FF842A"}}>
                <img src="sec-4-img-1.jpg" style={{width:'15%',height:'15%'}}/>
                <div className="card-body-s4"> 
                    <h2 className="card-title-s4">Comprehensive Test Library</h2>
                    <p className="card-text-s4">Access a wide range of coding challenges tailored for various skill levels and roles.</p>
                </div>
            </div>

            <div className="card w-75 sec-4-card right-card" style={{backgroundColor:"#745842"}}>
            <img src="sec-4-img-2.jpg" style={{width:'15%',height:'15%'}}/>
                <div className="card-body-s4">
                    <h2 className="card-title-s4">Advanced Analytics</h2>
                    <p className="card-text-s4">Get detailed insights into candidate performance with our powerful analytics tools.</p>
                </div>
            </div>
            <div className="card w-75 sec-4-card" style={{backgroundColor:"#9D3744"}}>
            <img src="sec-4-img-3.jpg" style={{width:'15%',height:'15%'}}/>
                <div className="card-body-s4">
                    <h2 className="card-title-s4">Customizable Assessments</h2>
                    <p className="card-text-s4">Create and customize tests to match your specific hiring needs.</p>
                </div>
            </div>
            <div className="card w-75 sec-4-card right-card">
            <img src="sec-4-img-4.jpg" style={{width:'15%',height:'15%'}}/>
                <div className="card-body-s4">
                    <h2 className="card-title-s4">Expert Support</h2>
                    <p className="card-text-s4">Benefit from our dedicated support team to assist you at every step.</p>
                </div>
            </div>
        </div>
    )
}