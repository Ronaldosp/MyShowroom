const initialState={
    features :[],
}

export default function featureReducer(state=initialState , action){
    if(action.type === "features/get"){
        return {
            ...state,
            features : action.payload
        }
    }
    return state;
}