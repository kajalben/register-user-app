import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import {NavLink} from "react-router-dom";

const Header = () =>{
    return(
        <>
        <NavLink to="/auth">
            Login
        </NavLink>
        <NavLink to="/registration">
            Registration
        </NavLink>
        <NavLink to="/dashboard">
            Deshboard
        </NavLink>
        </>
    );
}

export default Header;