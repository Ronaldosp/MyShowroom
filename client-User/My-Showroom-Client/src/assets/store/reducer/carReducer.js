const initialState={
    cars :[],
    carsDetail :[]
}

export default function brandReducer(state=initialState , action){
    if(action.type === "cars/get"){
        return {
            ...state,
            cars : action.payload
        }
    }
        if(action.type === "cars/detail/get"){
        return {
            ...state,
            carsDetail : action.payload
        }
    }
    return state;
}