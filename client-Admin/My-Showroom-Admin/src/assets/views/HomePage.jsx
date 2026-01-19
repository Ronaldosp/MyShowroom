import "../styling/HomePage.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBrands, fetchCategory, fetchFeatureCategory , fetchScpecificationCategory , fetchCar} from "../store/action/actionCreator.js";
import CarsPerBrandChart from "../components/CarsPerBrandChart.jsx";
import RecentlyAddedCars from "../components/RecentlyAddedCars.jsx";

function HomePage() {
    const categoryData = useSelector((state)=>{
        return state.categoryReducer.categories
    })

     const specificationCategoryData = useSelector((state)=>{
        return state.specificationCategoryReducer.specificationCategories
    })

    const featureCategoriesData = useSelector((state)=>{
        return state.featureCategoryReducer.featureCategories
    })

    const brandData = useSelector((state)=>{
     return state.brandReducer.brands
    })

    const carData = useSelector(
        (state) => state.carReducer.cars
    );
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCategory())
        dispatch(fetchBrands())
        dispatch(fetchFeatureCategory())
        dispatch(fetchScpecificationCategory())
        dispatch(fetchCar())
    },[dispatch])

    return(
        <div className="homepage-container">
            <div className="homepage-cards-container">
                <h2 className="homepage-title">Dashboard</h2>

                <div className="homepage-cards">
                    <div className="stat-card stat-brand">
                    <p className="stat-card-title">Brands</p>
                    <h1 className="stat-card-value">{brandData.length}</h1>
                    </div>

                    <div className="stat-card stat-category">
                    <p className="stat-card-title">Categories</p>
                    <h1 className="stat-card-value">{categoryData.length}</h1>
                    </div>

                    <div className="stat-card stat-feature">
                    <p className="stat-card-title">Feature Categories</p>
                    <h1 className="stat-card-value">{featureCategoriesData.length}</h1>
                    </div>

                    <div className="stat-card stat-spec">
                    <p className="stat-card-title">Specification Categories</p>
                    <h1 className="stat-card-value">{specificationCategoryData.length}</h1>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <CarsPerBrandChart cars={carData} brands={brandData} />
                <RecentlyAddedCars cars={carData} />
            </div>
        </div>
    )
}

export default HomePage