import axios from "axios";
import jwt from "jsonwebtoken";

const { REACT_APP_BACKEND_API_HEROKU, REACT_APP_ACCESS_TOKEN} = process.env;

// if (process.env.NODE_ENV === "production") {
//     axios.defaults.baseURL = REACT_APP_BACKEND_API_HEROKU
// } else {
//   axios.defaults.baseURL = 'http://localhost:3000';
// }

axios.defaults.baseURL = 'http://localhost:3000';

const setAuthHeaders = () => {
  const token = localStorage.getItem(REACT_APP_ACCESS_TOKEN);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return true;
  } else {
    return false;
  }
};

const decodeToken = () => {
  const token = localStorage.getItem(REACT_APP_ACCESS_TOKEN);
  let decodedToken;
  try {
    if (token) {
      decodedToken = jwt.decode(token);
    }
  } catch (error) {
    console.log(error.message);
  }
  return decodedToken;
};

const logout = () => {
  localStorage.removeItem(REACT_APP_ACCESS_TOKEN);
};

export {
  axios as client,
  setAuthHeaders,
  logout,
  decodeToken,
};
