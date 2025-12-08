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
                                <a className="listing-page-card-thumbnail-button" href="#"
                                    aria-label="Compare car">
                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"  height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z"></path>
                                        <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z"></path>
                                    </svg>
                                    <span className="btn-text">Compare</span>
                                </a >
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