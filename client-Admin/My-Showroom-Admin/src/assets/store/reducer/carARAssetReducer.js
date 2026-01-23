const initialState={
    carARAsset :[]
}

export default function carARAssetReducer(state=initialState , action){
    if(action.type === "cararasset/get"){
        return {
            ...state,
            carARAsset : action.payload
        }
    }
    return state;
}