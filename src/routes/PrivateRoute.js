import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

const PrivateRoute = ({children})  => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  console.debug(
      "PrivateRoute",
      "currentUser=", currentUser,
  );

  return currentUser ? children : navigate("/login");
}

export default PrivateRoute;
