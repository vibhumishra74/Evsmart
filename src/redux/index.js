let iniatialState = {
  islogin: false,
  getlocation: [],
  menu: false,
};
function Redux(state = iniatialState, action) {
  switch (action.type) {
    case "login":
      // console.log("action:", action);
      return {
        ...state,
        islogin: action.payload,
      };
    case "menu":
      return {
        ...state.menu,
        menu: action.payload,
      };
    case "get_location":
      return {
        ...state.getlocation,
        location: action.payload,
      };
    default: {
      return state;
    }
  }
}

export default Redux;
