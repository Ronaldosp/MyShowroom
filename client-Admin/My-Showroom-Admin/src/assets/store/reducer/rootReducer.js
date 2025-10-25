import { combineReducers } from "redux";
import brandReducer from "./brandReducer";

const rootReducer = combineReducers({
    brandReducer:brandReducer
})

export default rootReducer