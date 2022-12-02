import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import SignUpForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";

const AllRoutes = ({ login, signup }) => {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/signup" element={<SignUpForm signup={signup} />} />
			<Route path="/login" element={<LoginForm login={login} />} />
		</Routes>
	);
};

export default AllRoutes;
