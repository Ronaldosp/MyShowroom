const initialState = {
  dealerProfiles: [],
  dealerDetail: [],
  dealerCars: [],
};

export default function dealerReducer(state = initialState, action) {
  switch (action.type) {
    case "dealerProfiles/get":
      return {
        ...state,
        dealerProfiles: action.payload,
      };

    case "dealerProfiles/detail/get":
      return {
        ...state,
        dealerDetail: action.payload,
      };

    case "dealerProfiles/cars/get":
      return {
        ...state,
        dealerCars: action.payload,
      };

    case "CLEAR_DEALER_CARS":
      return {
        ...state,
        dealerCars: [],
      };

    case "RESET_DEALER_STATE":
      return initialState;

    default:
      return state;
  }
}