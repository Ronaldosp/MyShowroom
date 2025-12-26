const initialState={
    dealerProfiles :[],
}

export default function categoryReducer(state=initialState , action){
    if(action.type === "dealerProfiles/get"){
        return {
            ...state,
            dealerProfiles : action.payload
        }
    }
    return state;
}