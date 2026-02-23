import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import "../styling/CategoryCards.scss"
import { fetchCategory } from "../store/action/actionCreator";
import CardName from "./CardName";

export default function CategoryCards(){
    const data = useSelector((state)=>{
      return state.categoryReducer.categories
    })

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCategory())
    },[dispatch])

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
                        {(
                            data
                            .slice(0, 7)
                            .map((el , index) => {
                                return <CardName el={el} index={++index} key={el.id} />;
                            })
                        )}
                    </div>
                </div>
        </div>
    )
}