import { useState , useEffect } from "react";
import "../styling/Welcome.scss";
import testCar from "../images/test-car.png";

export default function Welcome() {

    return (
        <div className="welcome-container">
            <div className="welcome-title">
                <h2>Welcome to MyShowroom</h2>
            </div>
            <div className="welcome-description">
                <p>Lorem Ipsum is simply dummy text of th Lorem Ipsum is simply dummy text of th Lorem Ipsum is simply dummy text of th Lorem Ipsum is simply dummy text of th Lorem Ipsum is simply dummy text of th Lorem Ipsum is simply dummy text of th</p>
            </div>
            <div className="welcome-icon">
                <img src={testCar} alt="Car"/>
            </div>
        </div>
    )
}
