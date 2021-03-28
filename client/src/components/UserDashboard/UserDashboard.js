import React, { useState, useEffect, useContext, useCallback } from "react";
import "./user_dashboard.css";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserDashboard = ({ onLogout }) => {
  const { getUsers, state, deleteUser } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, []);

  const DeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      await deleteUser(id);
      getUsers();
    }
  };

  return (
    <div className="dashboard-container">
      <Button
        variant="outlined"
        color="primary"
        onClick={onLogout}
        className="logout-btn"
      >
        Logout
      </Button>
      {console.log(state.success != null)}

      <TableContainer component={Paper}>
        <Table className={classes.table} >
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Edit</TableCell>
              <TableCell align="left">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="left">{user.first_name}</TableCell>
                <TableCell align="left">{user.last_name}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">
                  <span className="user-icon edit-icon">
                    <Link to={`/registration/${user.id}`}>
                      <i className="fas fa-user-edit" />
                    </Link>
                  </span>
                </TableCell>
                <TableCell align="left">
                  <span
                    className="user-icon delete-icon"
                    onClick={(e) => DeleteUser(user.id)}
                  >
                    <i className="fas fa-user-times"></i>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserDashboard;
