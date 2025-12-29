const initialState={
    specificationCategories :[],
}

export default function specificationCategoryReducer(state=initialState , action){
    if(action.type === "specificationcategories/get"){
        return {
            ...state,
            specificationCategories : action.payload
        }
    }
    return state;
}