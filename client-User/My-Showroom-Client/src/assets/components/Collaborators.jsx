import { useState , useEffect } from "react";
import "../styling/Collaborator.scss";
import testCar2 from "../images/test-car-2.jpg";
import testCar3 from "../images/test-car-3.jpg";
import testCar4 from "../images/test-car-4.jpg";
import testCar5 from "../images/test-car-5.jpg";
import testCar6 from "../images/test-car-6.jpg";
import testCar7 from "../images/test-car-7.jpg";


export default function Collaborator(){
    
    return(
        <div className="collaborator-container">
            <div className="collaborator-content-container">
                <div className="collaborator-content-title">
                    <h2>Our Collaborators</h2>
                </div>
                <div className="collaborator-content-description">
                    <p>Brands/Showroom we've worked together with</p>
                </div>
                <div className="collaborator-content-image-container">
                    <div className="collaborator-content-image">
                        <img src={testCar2} alt=""/>
                    </div>
                    <div className="collaborator-content-image">
                        <img src={testCar3} alt=""/>
                    </div>
                    <div className="collaborator-content-image">
                        <img src={testCar4} alt=""/>
                    </div>
                    <div className="collaborator-content-image">
                        <img src={testCar5} alt=""/>
                    </div>
                    <div className="collaborator-content-image">
                        <img src={testCar6} alt=""/>
                    </div>
                    <div className="collaborator-content-image">
                        <img src={testCar7} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}