import "../styling/ListingPage.scss";
import testCar8 from "../images/test-car-8.jpg";

export default function ListingPage(){
    return(
        <div className="listing-page-component">
            <div className="listing-page-container">
                <div className="listing-page-left-side">
                    <h2>NAVBAR LEFT SIDE</h2>
                </div>
                <div className="listing-page-right-side">
                    <h3>ITEMS RIGHT SIDE</h3>
                    <div className="listing-page-card-container">
                        <div className="listing-page-cards">
                            <div className="listing-page-card-thumbnail">
                                <img src={testCar8} alt="thumbnail"/>
                            </div>
                            <div className="listing-page-card-top-background"></div>
                            <div className="listing-page-card-top-desc">
                                <div className="listing-page-card-top-part">
                                    <div className="listing-page-card-logo">
                                        <img src="" alt="logo"/>
                                    </div>
                                    <div className="listing-page-card-model">
                                        <h5>Toyota Supra MK5</h5>
                                    </div>
                                </div>
                                <div className="listing-page-card-bottom-part">
                                    <div className="listing-page-card-price">
                                        <p>Rp. 3.000.000.000</p>
                                    </div>
                                    <div className="listing-page-card-button">
                                            <a href="#">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* card divider */}
                        <div className="listing-page-cards">
                            <div className="listing-page-card-thumbnail">
                                <img src={testCar8} alt="thumbnail"/>
                            </div>
                            <div className="listing-page-card-top-background"></div>
                            <div className="listing-page-card-top-desc">
                                <div className="listing-page-card-top-part">
                                    <div className="listing-page-card-logo">
                                        <img src="" alt="logo"/>
                                    </div>
                                    <div className="listing-page-card-model">
                                        <h5>Toyota Supra MK5</h5>
                                    </div>
                                </div>
                                <div className="listing-page-card-bottom-part">
                                    <div className="listing-page-card-price">
                                        <p>Rp. 3.000.000.000</p>
                                    </div>
                                    <div className="listing-page-card-button">
                                            <a href="#">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* card divider */}
                        <div className="listing-page-cards">
                            <div className="listing-page-card-thumbnail">
                                <img src={testCar8} alt="thumbnail"/>
                            </div>
                            <div className="listing-page-card-top-background"></div>
                            <div className="listing-page-card-top-desc">
                                <div className="listing-page-card-top-part">
                                    <div className="listing-page-card-logo">
                                        <img src="" alt="logo"/>
                                    </div>
                                    <div className="listing-page-card-model">
                                        <h5>Toyota Supra MK5</h5>
                                    </div>
                                </div>
                                <div className="listing-page-card-bottom-part">
                                    <div className="listing-page-card-price">
                                        <p>Rp. 3.000.000.000</p>
                                    </div>
                                    <div className="listing-page-card-button">
                                            <a href="#">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* card divider */}
                        <div className="listing-page-cards">
                            <div className="listing-page-card-thumbnail">
                                <img src={testCar8} alt="thumbnail"/>
                            </div>
                            <div className="listing-page-card-top-background"></div>
                            <div className="listing-page-card-top-desc">
                                <div className="listing-page-card-top-part">
                                    <div className="listing-page-card-logo">
                                        <img src="" alt="logo"/>
                                    </div>
                                    <div className="listing-page-card-model">
                                        <h5>Toyota Supra MK5</h5>
                                    </div>
                                </div>
                                <div className="listing-page-card-bottom-part">
                                    <div className="listing-page-card-price">
                                        <p>Rp. 3.000.000.000</p>
                                    </div>
                                    <div className="listing-page-card-button">
                                            <a href="#">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* card divider */}
                        <div className="listing-page-cards">
                            <div className="listing-page-card-thumbnail">
                                <img src={testCar8} alt="thumbnail"/>
                            </div>
                            <div className="listing-page-card-top-background"></div>
                            <div className="listing-page-card-top-desc">
                                <div className="listing-page-card-top-part">
                                    <div className="listing-page-card-logo">
                                        <img src="" alt="logo"/>
                                    </div>
                                    <div className="listing-page-card-model">
                                        <h5>Toyota Supra MK5</h5>
                                    </div>
                                </div>
                                <div className="listing-page-card-bottom-part">
                                    <div className="listing-page-card-price">
                                        <p>Rp. 3.000.000.000</p>
                                    </div>
                                    <div className="listing-page-card-button">
                                            <a href="#">Learn More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}