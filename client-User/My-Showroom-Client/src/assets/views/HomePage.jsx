import { NavLink, Outlet } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createBrands, fetchBrands } from "../store/action/actionCreator.js";
import Carousel from "../components/Carousel.jsx";
import Welcome from "../components/Welcome.jsx";
import Collaborator from "../components/Collaborators.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Image from "../components/Image.jsx";
import Footer from "../components/Footer.jsx";
import CategoryCards from "../components/CategoryCard.jsx";

import testCar8 from "../images/test-car-8.jpg";

function HomePage(){

    return (
        <div style={{
          backgroundImage: 'url("")',
          backgroundSize: "cover",
          // backgroundColor: '#20B2AA',
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
        <Carousel/>
        <Welcome/>
        <Collaborator/>
        <AboutUs/>
        <Image src={testCar8}/>
        <CategoryCards/>
        <Footer/>
        </div>
      );
}

export default HomePage