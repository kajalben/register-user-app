export default (state, action) => {
  switch (action.type) {
    case "FATCH_DATA":
      return {
        ...state,
        fetching: true,
        success: null,
        error: null,
      };

    case "ERROR":
      return {
        ...state,
        fetching: false,
        error: action.payload,
        success: null,
      };

    case "CREATE_USER_SUCCESS":
      return {
        ...state,
        fetching: false,
        success: action.payload,
        error: null,
      };

    case "GET_ALL_SUCCESS":
      return {
        ...state,
        fetching: false,
        users: action.payload,
        error: null,
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        fetching: false,
        success: action.payload,
        error: null,
      };

    case "EDIT_USER_SUCCESS":
      return {
        ...state,
        fetching: false,
        success: action.payload,
        error: null,
      };

    default:
      return state;
  }
};
