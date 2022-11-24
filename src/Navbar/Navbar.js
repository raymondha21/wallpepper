import React, { useContext } from "react";
import { NavLink, Link, } from "react-router-dom";
import UserContext from "../auth/UserContext";
import './Navbar.css'

const Navbar = ({logout}) => {
  const {currentUser} = useContext(UserContext);
  
  const loggedInNav = () => {
    return (
      <ul className="navbar-nav ml-auto">

      <li className="nav-item mr-4">
      <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </li>
      <li className="nav-item mr-4">
      <NavLink className="nav-link" to="/" onClick={logout}>
          Log Out
        </NavLink>
      </li>
    </ul>
    );
  }

  const loggedOutNav = () => {
    return (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/signup">
          Sign Up
        </NavLink>
      </li>
    </ul>
    );
  }
  
  return (
    <nav className="Navbar navbar navbar-expand-md">
        <Link className="navbar-brand" to="/">
          WallPepper
        </Link>
        {currentUser ? loggedInNav() : loggedOutNav()}
    
    </nav>
  );
};

      
export default Navbar;
