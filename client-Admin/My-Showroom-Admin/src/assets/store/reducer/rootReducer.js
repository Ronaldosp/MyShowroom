import { combineReducers } from "redux";
import brandReducer from "./brandReducer";
import categoryReducer from "./categoryReducer";
import carReducer from "./carReducer";
import featureCategoryReducer from "./featureCategoryReducer";
import specificationCategoryReducer from "./specificationCategoryReducer"

const rootReducer = combineReducers({
    brandReducer:brandReducer,
    categoryReducer:categoryReducer,
    carReducer:carReducer,
    featureCategoryReducer:featureCategoryReducer,
    specificationCategoryReducer:specificationCategoryReducer,
})

export default rootReducer