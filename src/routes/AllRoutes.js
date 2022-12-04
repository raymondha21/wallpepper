import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import SignUpForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";
import PhotoCrop from "../components/crop/PhotoCrop";
import UserProfile from "../components/users/UserProfile";

const AllRoutes = ({ login, signup }) => {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/signup" element={<SignUpForm signup={signup} />} />
			<Route path="/login" element={<LoginForm login={login} />} />
			<Route path="/profile" element={<UserProfile/>}/>
			<Route path="/photos/upload" element={<PhotoCrop />} />
		</Routes>
	);
};

export default AllRoutes;
