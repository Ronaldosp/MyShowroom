import "../styling/ComparePage.scss";
import testCar8 from "../images/test-car-8.jpg";
import { fetchCar , fetchCategory , fetchBrands  } from "../store/action/actionCreator";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

function ComparePage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const carData = useSelector(
        (state) => state.carReducer.cars
    );
    console.log(carData,"carData");
    
    const compareIds = JSON.parse(localStorage.getItem("compareCars")) || [];
    console.log(compareIds,"compareIds");
    const comparedCars = carData.filter((car) =>
        compareIds.includes(car.id)
    );
    console.log(comparedCars,"comparedCars");

    const prices = comparedCars.map((car) => car.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    useEffect(() => {
        dispatch(fetchCar())
    }, [dispatch]);
    
    return(
        <div className="compare-page-component">
            <div className="compare-page-component-container">
                <div className="compare-page-component-items">
                    <div className="compare-page-component-items-container">
                        {/* Top Part */}
                        <div className="compare-page-component-items-top-container">
                            {comparedCars.map((car) => (
                                <div className="compare-page-component-items-top">
                                    <div className="compare-page-component-items-title">
                                        <h4>{car.model}</h4>
                                    </div>
                                    <div className="compare-page-component-items-thumbnail">
                                        <img src={car.thumbnail} alt=""/>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Comparison Part */}
                        <div className="compare-page-component-items-price">
                            <h2>Price Comparison</h2>
                                {comparedCars.map((car, index) => {
                                    const numericPrice = car.price;
                                    const isCheapest = numericPrice === minPrice;
                                    const isExpensive = numericPrice === maxPrice;

                                    return (
                                        <div
                                        className="compare-page-component-items-price-container"
                                        key={car.id}
                                        >
                                        <div className="compare-page-component-items-price-title">
                                            <h4>{car.model}</h4>
                                        </div>

                                        <div className="compare-page-component-items-price-nominal">
                                            <h4>{car.price}</h4>

                                            {isCheapest && (
                                            <span className="price-tag cheapest">
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M20 6L9 17l-5-5"
                                                    stroke="white"
                                                    strokeWidth="3"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                </svg>
                                                Cheapest
                                            </span>
                                            )}

                                            {isExpensive && (
                                            <span className="price-tag expensive">
                                                Most Expensive
                                            </span>
                                            )}
                                        </div>
                                        </div>
                                    );
                                })}
                        </div>      

                        {/* Performance Comparison Part */}
                        <div className="compare-page-component-items-performance">
                            <h2>Performance</h2>
                            <div className="compare-page-component-items-performance-container">
                                <div className="compare-page-component-items-performance-title">
                                    <h4></h4>
                                </div>
                                <div className="compare-page-component-items-performance-description">
                                    <h3></h3>
                                </div>
                            </div>
                        </div>

                        {/* Feature Comparison Part  */}
                        <div className="compare-page-component-items-features">
                            <h2>Features</h2>
                            <div className="compare-page-component-items-features-container">
                                <div className="compare-page-component-items-features-title">
                                    <h4></h4>
                                </div>
                                <div className="compare-page-component-items-features-description">
                                    <h3></h3>
                                </div>
                            </div>
                        </div>

                        {/* Technology Comparison Part */}
                        <div className="compare-page-component-items-technology">
                            <h2>Technologies</h2>
                            <div className="compare-page-component-items-technology-container">
                                <div className="compare-page-component-items-technology-title">
                                    <h4></h4>
                                </div>
                                <div className="compare-page-component-items-technology-description">
                                    <h3></h3>
                                </div>
                            </div>
                        </div>

                        {/*  */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComparePage