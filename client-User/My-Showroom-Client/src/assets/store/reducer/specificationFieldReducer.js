const initialState={
    specificationFields :[],
}

export default function specificationFieldReducer(state=initialState , action){
    if(action.type === "specificationfields/get"){
        return {
            ...state,
            specificationFields : action.payload
        }
    }
    return state;
}