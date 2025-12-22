import { combineReducers } from "redux";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import carReducer from "./carReducer";
import featureCategoryReducer from "./featureCategoryReducer";

const rootReducer = combineReducers({
    brandReducer:brandReducer,
    categoryReducer:categoryReducer,
    carReducer:carReducer,
    featureCategoryReducer:featureCategoryReducer,
})

export default rootReducer