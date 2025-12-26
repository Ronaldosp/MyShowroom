import { combineReducers } from "redux";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import carReducer from "./carReducer";
import dealerReducer from "./dealerReducer";

const rootReducer = combineReducers({
    brandReducer:brandReducer,
    categoryReducer:categoryReducer,
    carReducer:carReducer,
    dealerReducer:dealerReducer,
})

export default rootReducer