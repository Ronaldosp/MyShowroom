const initialState={
    cars :[],
    carsDetail :[],
    carsId :[]
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
    if(action.type === "cars/getById"){
        return {
            ...state,
            carsId : action.payload
        }
    }
    
    return state;
}