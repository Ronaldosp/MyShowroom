import "../styling/ComparePage.scss";
import testCar8 from "../images/test-car-8.jpg";
import { fetchCar , fetchCategory , fetchBrands, fetchFeatureCategory ,fetchCarId , fetchSpecificationCategory  } from "../store/action/actionCreator";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";

function ComparePage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const carData = useSelector(
        (state) => state.carReducer.cars
    );

    const featureCategoryData = useSelector(
        (state) => state.featureCategoryReducer.featureCategories
    );

    const [activeSpecCategory, setActiveSpecCategory] = useState(
        featureCategoryData?.[0]?.id || null
    );

    const specificationCategoryData = useSelector(
        (state) => state.specificationCategoryReducer.specificationCategories
    );

    const compareIds = JSON.parse(localStorage.getItem("compareCars")) || [];

    const comparedCars = carData.filter((car) =>
        compareIds.includes(car.id)
    );
    console.log(comparedCars,"comparedCars");

    const prices = comparedCars.map((car) => car.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    useEffect(() => {
        dispatch(fetchCar())
        dispatch(fetchFeatureCategory())
        dispatch(fetchSpecificationCategory())
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
                                            <h4>RP {car.price.toLocaleString('ID')} ,00</h4>

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

                        <div className="compare-specification-container">
                            {/* LEFT — categories */}
                            <div className="spec-categories">
                                {specificationCategoryData.map(category => (
                                    <div
                                        key={category.id}
                                        className={`spec-category-item ${
                                            activeSpecCategory === category.id ? "active" : ""
                                        }`}
                                        onClick={() => setActiveSpecCategory(category.id)}
                                    >
                                        {category.name}
                                    </div>
                                ))}
                            </div>

                            {/* RIGHT — data of selected category */}
                            <div className="spec-details">
                                {comparedCars.map(car => {
                                    const specs = car.Specifications?.filter(
                                        s => s.SpecificationCategory?.id === activeSpecCategory
                                    );

                                    return (
                                        <div key={car.id} className="spec-car-column">
                                            <h4>{car.model}</h4>

                                            {specs?.length ? (
                                                specs.map(spec =>
                                                    spec.SpecificationFields?.map(field => (
                                                        <div key={field.id} className="spec-field">
                                                            <span className="spec-key">{field.key}:</span>
                                                            <span className="spec-value">{field.value} {field.unit}</span>
                                                        </div>
                                                    ))
                                                )
                                            ) : (
                                                <p className="text-muted">No data</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {featureCategoryData.map(category => (
                            <div key={category.id} className="compare-page-component-items">
                                <div className="compare-page-component-items-title">
                                    <h2>{category.name}</h2>
                                </div>
                                
                                <div className="compare-page-component-items-container">
                                    {comparedCars.map(car => {
                                        const features = car.Features?.filter(
                                            s => s.FeatureCategory?.id === category.id
                                        );
                                        
                                        return (
                                            <div
                                                key={car.id}
                                                className={`compare-page-component-items-column-${comparedCars.length}`}
                                            >
                                                <div className="compare-page-component-items-column-title">
                                                    <p>{car.model}</p>
                                                </div>
                                                {features?.length ? (
                                                    features.map(feature =>
                                                        <div key={feature.id} className="compare-page-component-items-content">
                                                            <div className="compare-page-component-items-content-image">
                                                                <img src={feature.thumbnail}/>
                                                            </div>
                                                            <div className="compare-page-component-items-content-name">
                                                                <h4>{feature.name}</h4>
                                                            </div>
                                                            <div className="compare-page-component-items-content-image-description">
                                                                <p>{feature.description}</p>
                                                            </div>
                                                            
                                                        </div>
                                                    )
                                                ) : (
                                                    <p className="text-muted">—</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ComparePage