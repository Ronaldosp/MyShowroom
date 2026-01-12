import { combineReducers } from "redux";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import carReducer from "./carReducer";
import dealerReducer from "./dealerReducer";
import specificationCategoryReducer from "./specificationCategoryReducer";
import featureCategoryReducer from "./featureCategoryReducer";
import featureReducer from "./featureReducer";
import specificationFieldReducer from "./specificationFieldReducer";
import specificationReducer from "./specificationReducer";

const rootReducer = combineReducers({
    brandReducer:brandReducer,
    categoryReducer:categoryReducer,
    carReducer:carReducer,
    dealerReducer:dealerReducer,
    specificationCategoryReducer:specificationCategoryReducer,
    featureCategoryReducer:featureCategoryReducer,
    featureReducer:featureReducer,
    specificationFieldReducer:specificationFieldReducer,
    specificationReducer:specificationReducer,

})

export default rootReducer