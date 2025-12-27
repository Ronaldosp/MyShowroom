const initialState={
    dealerProfiles :[],
    dealerDetail:[],
    dealerCars:[],
}

export default function categoryReducer(state=initialState , action){
    if(action.type === "dealerProfiles/get"){
        return {
            ...state,
            dealerProfiles : action.payload
        }
    }
    if(action.type === "dealerProfiles/detail/get"){
        return{
            ...state,
            dealerDetail: action.payload
        }
    }
    if(action.type === "dealerProfiles/cars/get"){
        return{
            ...state,
            dealerCars: action.payload
        }
    }
    return state;
}