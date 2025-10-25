const initialState={
    brands :[],
}

export default function brandReducer(state=initialState , action){
    if(action.type === "brands/get"){
        return {
            ...state,
            brands : action.payload
        }
    }
}