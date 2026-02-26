const initialState={
    userProfiles :[],
}

export default function userProfileReducer(state=initialState , action){
    if(action.type === "userprofiles/getById"){
        return {
            ...state,
            userProfiles : action.payload
        }
    }
    return state;
}