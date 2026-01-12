const initialState={
    featureCategories :[],
}

export default function featureCategoryReducer(state=initialState , action){
    if(action.type === "featurecategories/get"){
        return {
            ...state,
            featureCategories : action.payload
        }
    }
    return state;
}