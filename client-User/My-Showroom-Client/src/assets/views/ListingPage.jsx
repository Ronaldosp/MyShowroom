import "../styling/ListingPage.scss";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchCar , fetchCategory , fetchBrands  } from "../store/action/actionCreator";

export default function ListingPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const isLoggedIn = !!localStorage.getItem("access_token");
    const dataCategories = useSelector((state)=>{
      return state.categoryReducer.categories
    })

    const dataBrands = useSelector((state)=>{
      return state.brandReducer.brands
    })

    const carData = useSelector(
        (state) => state.carReducer.cars
    );

    const getCompareList = () => {
        return JSON.parse(localStorage.getItem("compareCars")) || [];
    };

    const addToCompare = (carId) => {
        const current = getCompareList();

        if (current.includes(carId)) return; 
        if (current.length >= 3) {
            alert("You can compare up to 3 cars");
            return;
        }

        const updated = [...current, carId];
        localStorage.setItem("compareCars", JSON.stringify(updated));
        setCompareCount(updated.length);
    };

    const removeFromCompare = (carId) => {
        const current = getCompareList();
        const updated = current.filter((id) => id !== carId);

        localStorage.setItem("compareCars", JSON.stringify(updated));
        setCompareCount(updated.length);
    };

    const isCompared = (carId) => {
        return getCompareList().includes(carId);
    };

    const [compareCount, setCompareCount] = useState(0);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleBrand = (id) => {
        setSelectedBrands((prev) =>
            prev.includes(id)
            ? prev.filter((b) => b !== id)
            : [...prev, id]
        );
    };

    const toggleCategory = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
            ? prev.filter((c) => c !== id)
            : [...prev, id]
        );
    };
    
    useEffect(() => {
        dispatch(fetchCar())
        dispatch(fetchCategory())
        dispatch(fetchBrands())
    }, [dispatch]);

    useEffect(() => {
        setCompareCount(getCompareList().length);
    }, []);

   const filteredCars = carData.filter((car) => {
        const searchMatch =
            car.model.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedBrands.length === 0 && selectedCategories.length === 0) {
            return searchMatch;
        }

        const brandMatch = selectedBrands.includes(car.brand_id);
        const categoryMatch = selectedCategories.includes(car.category_id);

        return searchMatch && (brandMatch || categoryMatch);
    });

    return(
        <div className="listing-page-component">
            <div className="listing-page-container">
                {compareCount > 0 && (
                    <div
                        className="compare-floating"
                        onClick={() => {
                                if(!isLoggedIn){
                                    Swal.fire("Error", "Must be Logged in to view compare", "error");
                                }else{
                                    navigate("/compare")
                                }
                            }
                        }
                    >
                        Compare ({compareCount})
                    </div>
                )}
                <div className={`listing-page-left-side ${showFilter ? "open" : ""}`}>
                    <button
                        className="close-filter"
                        onClick={() => setShowFilter(false)}
                        >
                        ✕ Close
                    </button>
                    <div className="listing-page-filter-container">
                        <h4>Search</h4>
                        <div className="listing-page-filter-search">
                            <input
                                type="text"
                                placeholder="Search by model..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <h4>Brands</h4>
                        <div className="listing-page-filter-brands">
                            {dataBrands.map((brand) => (
                                <label key={brand.id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand.id)}
                                    onChange={() => toggleBrand(brand.id)}
                                />
                                {brand.name}
                                </label>
                            ))}
                        </div>
                        <h4>Categories</h4>
                        <div className="listing-page-filter-categories">
                            {dataCategories.map((category) => (
                                <label key={category.id} className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => toggleCategory(category.id)}
                                />
                                {category.name}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mobile-filter-btn">
                    <button onClick={() => setShowFilter(true)}>Filter</button>
                </div>
                <div className="listing-page-right-side">
                    <div className="listing-page-card-container">
                        {filteredCars.map((car) => (
                            <div className="listing-page-cards">
                                <div className="listing-page-card-thumbnail ">
                                    <img src={car.thumbnail} alt={car.model}/>
                                    <a className={`listing-page-card-thumbnail-button ${isCompared(car.id) ? "active" : ""}`} onClick={() =>
                                            isCompared(car.id)
                                            ? removeFromCompare(car.id)
                                            : addToCompare(car.id)
                                        }
                                        aria-label="Compare car">
                                        {isCompared(car.id) ? (
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 1024 1024"
                                                height="20"
                                                width="20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                            {/* Minus icon */}
                                                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H192q-8 0-8-8v-60q0-8 8-8Z"></path>
                                            </svg>
                                        ) : (
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 1024 1024"
                                                height="20"
                                                width="20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                            {/* Plus icon */}
                                                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
                                                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
                                            </svg>
                                        )}
                                        <span className="btn-text">{isCompared(car.id) ? "Added" : "Compare"}</span>
                                    </a >
                                </div>
                                <div className="listing-page-card-top-background"></div>
                                <div className="listing-page-card-top-desc">
                                    <div className="listing-page-card-top-part">
                                        <div className="listing-page-card-logo">
                                            <img src={car.Brand?.logo} alt="logo"/>
                                        </div>
                                        <div className="listing-page-card-model">
                                            <h5>{car.model}</h5>
                                        </div>
                                    </div>
                                    <div className="listing-page-card-bottom-part">
                                        <div className="listing-page-card-price">
                                            <p>Rp. {car.price.toLocaleString("id-ID")} IDR</p>
                                        </div>
                                        <div className="listing-page-card-button">
                                                <a onClick={() => {
                                                        if(!isLoggedIn){
                                                            Swal.fire("Error", "Must be Logged in to view detail", "error");
                                                        }else{
                                                            navigate(`/detail/${car.id}`)
                                                        }
                                                    }
                                                } >Detail</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}