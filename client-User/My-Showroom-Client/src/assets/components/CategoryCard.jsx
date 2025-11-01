import { useState , useEffect } from "react";
import "../styling/CategoryCards.scss"

export default function CategoryCards(){

    return(
        <div className="category-cards-container">
            <div className="category-cards-top-content">
                <div className="category-cards-title">
                    <h5>Vehicle Options</h5>
                </div>
                <div className="category-cards-description">
                    <h3>Browse by Category</h3>
                </div>
            </div>
            <div className="category-cards-bottom-content">
                <div className="category-cards-card">
                    <div className="category-cards-card-container">
                        <div className="category-cards-card-title">
                            <h5>Sport</h5>
                        </div>
                        <a href="">
                            <img src="https://cdn.prod.website-files.com/6751695b5f949fbb13dd9170/67517fd4540593fb2c03d31b_category-thumb-08-p-500.jpg"/>
                        </a>
                    </div>

                    <div className="category-cards-card-container">
                        <div className="category-cards-card-title">
                            <h5>SUV</h5>
                        </div>
                        <a href="">
                            <img src="https://images.unsplash.com/photo-1688398658165-9f404b8617d3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWNsYXJlbiUyMDc2NWx0fGVufDB8fDB8fHww&fm=jpg&q=60&w=3000"/>
                        </a>
                    </div>

                    <div className="category-cards-card-container">
                        <div className="category-cards-card-title">
                            <h5>Electric</h5>
                        </div>
                        <a href="">
                            <img src="https://media.licdn.com/dms/image/v2/D4E10AQF7NPpTVzqZXg/image-shrink_800/image-shrink_800/0/1693036804009?e=2147483647&v=beta&t=ezSWHl0zjxmT5UYJ3BEOhMLNMBdIILApGW5J4XOjcE8"/>
                        </a>
                    </div>

                    <div className="category-cards-card-container">
                        <div className="category-cards-card-title">
                            <h5>Luxury</h5>
                        </div>
                        <a href="">
                            <img src="https://ik.imagekit.io/onlock/u7728714411_Cinematic_side_view_of_a_black_Mercedes-Maybach_con_cb6fb14d-4c6e-4d86-a32e-041aa45b23ae.png?tr=w-300"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}