const initialState={
    specifications :[],
}

export default function specificationReducer(state=initialState , action){
    if(action.type === "specifications/get"){
        return {
            ...state,
            specifications : action.payload
        }
    }
    return state;
}