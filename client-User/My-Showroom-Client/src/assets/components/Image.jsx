import { useState , useEffect } from "react";
import "../styling/Image.scss";

export default function Image(src){
    return(
        <div className="image-container"> 
            <img src={src.src}alt=""/>
        </div>
    )
}