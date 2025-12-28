const initialState={
    cars :[],
}

export default function brandReducer(state=initialState , action){
    if(action.type === "cars/get"){
        return {
            ...state,
            cars : action.payload
        }
    }
    return state;
}