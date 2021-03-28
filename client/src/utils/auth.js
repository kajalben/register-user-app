import axios from "axios";
import jwt from "jsonwebtoken";

const { REACT_APP_ACCESS_TOKEN } = process.env;

axios.defaults.baseURL = "http://localhost:3000";

const checkAuth = () => {
  const token = localStorage.getItem(REACT_APP_ACCESS_TOKEN);
  return token ? true : false;
};

//check JSON web token
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

export { axios as client, checkAuth, logout, decodeToken };
