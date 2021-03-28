import React, { useState, useEffect, useCallback, useContext } from "react";
import "./signup.css";
import SignupForm from "./SignupForm";
// import { useUsers } from "../../context/UserContext";
import { UserContext } from "../../context/UserContext";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const { id } = useParams();
  const history = useHistory();
  const [values, setValues] = useState(initialValues);
  const [isEdit, setIsEdit] = useState(false);
  // const users = useUsers();
  // const stableGetAll = useCallback(users.getUsers, []);
  const { getUsers, createUser, editUser,state } = useContext(
    UserContext
  );

  //   useEffect(() => {
  //     stableGetAll()
  // }, [stableGetAll])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      const user = state.users.find(
        (user) => user.id === parseInt(id, 10)
      );
      setValues(user);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      ...values,
    };

    if (isEdit) {
      const isUserUpdated = await editUser(id, newUser);
      if (isUserUpdated) {
      // getUsers();
      history.push("/dashboard");
    }
    } else {
      const isUserCreated = await createUser(newUser);
      if (isUserCreated) {
        // getUsers();
        history.push("/dashboard");
      }
    }
  };

  return (
    <>
      <div className="form_container">
        
        {isEdit ? <h2>Edit User</h2> : <h2>Register</h2>}
        <SignupForm
          values={values}
          onChange={handleInputChange}
          onClick={handleSubmit}
          isEdit={isEdit}
          error={state.error}
        />
        {!isEdit && <Link to="/auth">Already have an account? Login</Link>}
      </div>
    </>
  );
};

export default Signup;
