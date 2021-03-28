import React, { createContext, useReducer, useMemo } from "react";
import UserReducer from "./UserReducer";
import {client} from "../utils/auth";

// Initial State
const initialState = {
  fetching: false,
  users: [],
  error: null,
  success: null,
};

// Create Context
export const UserContext = createContext(initialState);

// Provider Component
export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Actions
  const createUser = async (body) => {
      try {
        dispatch({ type: "FATCH_DATA" });
        const res = await client.post('user/add', body);
        
        if (res.status === 200) {
          dispatch({ type: "CREATE_USER_SUCCESS", payload: res.data.success});
          const token = res.data.accessToken;
          if(token){
            localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN, token);
            return true;
          }
        }
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.response.data.error});
      return false;
    }
  };

  const getUsers = async () => {
    try {
      dispatch({ type: "FATCH_DATA" });
      const res = await client.get('user/all');
      if (res.status === 200) {
        dispatch({ type: "GET_ALL_SUCCESS", payload: res.data });
      }
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.response.data.error })
    }
  };

  const deleteUser = async (id) => {
    try {
      dispatch({ type: "FATCH_DATA" });
      const res = await client.delete(`user/delete/${id}`);
      if (res.status === 200) {
        dispatch({ type: "DELETE_USER_SUCCESS" });
      }
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.response.data.error });
    }
  };

  const editUser = async (id, body) => {
    try {
      dispatch({ type: "FATCH_DATA" });
      const res = await client.put(`user/edit/${id}`, body);
      if (res.status === 200) {
        dispatch({ type: "EDIT_USER_SUCCESS", payload: res.data.success });
        return true;
      }
    } catch (e) {
      dispatch({ type: "ERROR", payload: e.response.data.error });
      return false;
    }
  };


  return (
    <UserContext.Provider
      value={{
        state: state,
        users: state.users,
        error: state.error,
        getUsers,
        createUser,
        editUser,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

