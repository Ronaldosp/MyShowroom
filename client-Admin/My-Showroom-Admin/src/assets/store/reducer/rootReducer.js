import { combineReducers } from "redux";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import carReducer from "./carReducer";

const rootReducer = combineReducers({
    brandReducer:brandReducer,
    categoryReducer:categoryReducer,
    carReducer:carReducer
})

export default rootReducer