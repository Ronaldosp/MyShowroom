import "../styling/ComparePage.scss";
import testCar8 from "../images/test-car-8.jpg";

function ComparePage(){

    const priceData = [
        { title: "Porsche Taycan 2021 Electric", price: "Rp.1.500.000.000" },
        { title: "Porsche Taycan 2021 Electric", price: "Rp.2.100.000.000" },
        { title: "Porsche Taycan 2021 Electric", price: "Rp.3.300.000.000" },
    ];

    const parsedPrices = priceData.map((item) => ({
        ...item,
        numericPrice: Number(item.price.replace(/[^0-9]/g, "")), // remove Rp and dots
    }));

    const minPrice = Math.min(...parsedPrices.map(i => i.numericPrice));
    const maxPrice = Math.max(...parsedPrices.map(i => i.numericPrice));

    
    return(
        <div className="compare-page-component">
            <div className="compare-page-component-container">
                <div className="compare-page-component-items">
                    <div className="compare-page-component-items-container">
                        {/* Top Part */}
                        <div className="compare-page-component-items-top-container">
                            <div className="compare-page-component-items-top">
                                <div className="compare-page-component-items-title">
                                    <h4>Porsche Taycan 2021 Hybrid </h4>
                                </div>
                                <div className="compare-page-component-items-thumbnail">
                                    <img src={testCar8} alt=""/>
                                </div>
                            </div>
                            <div className="compare-page-component-items-top">
                                    <div className="compare-page-component-items-title">
                                        <h4>Porsche Taycan 2021 Hybrid </h4>
                                    </div>
                                    <div className="compare-page-component-items-thumbnail">
                                        <img src={testCar8} alt=""/>
                                    </div>
                            </div>

                            <div className="compare-page-component-items-top">
                                    <div className="compare-page-component-items-title">
                                        <h4>Porsche Taycan 2021 Hybrid </h4>
                                    </div>
                                    <div className="compare-page-component-items-thumbnail">
                                        <img src={testCar8} alt=""/>
                                    </div>
                            </div>
                        </div>

                        {/* Price Comparison Part */}
                        <div className="compare-page-component-items-price">
                            <h2>Price Comparison</h2>

                            {parsedPrices.map((item, index) => {
                                const isCheapest = item.numericPrice === minPrice;
                                const isExpensive = item.numericPrice === maxPrice;

                                return (
                                <div className="compare-page-component-items-price-container" key={index}>
                                    <div className="compare-page-component-items-price-title">
                                    <h4>{item.title}</h4>
                                    </div>

                                    <div className="compare-page-component-items-price-nominal">
                                    <h4>{item.price}</h4>{isCheapest && (
                                        <span className="price-tag cheapest"><svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg> Cheapest</span>
                                    )}
                                    {isExpensive && (
                                        <span className="price-tag expensive">Most Expensive</span>
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