import React from "react";
import { Routes, Route } from "react-router-dom";
import GenericWallpaperHomepage from "../components/GenericWallpaperHomepage/GenericWallpaperHomepage";
import SignUpForm from "../components/auth/SignupForm";
import LoginForm from "../components/auth/LoginForm";
import PhotoCrop from "../components/crop/PhotoCrop";
import UserProfile from "../components/users/UserProfile";
import UserLikes from "../components/users/UserLikes";

const AllRoutes = ({ login, signup }) => {
	return (
		<Routes>
			<Route
				path="/"
				element={<GenericWallpaperHomepage currentSubreddit="wallpapers"/>}
			/>
			<Route path="/signup" element={<SignUpForm signup={signup} />} />
			<Route path="/login" element={<LoginForm login={login} />} />
			<Route path="/profile" element={<UserProfile />} />
			<Route path="/profile/likes" element={<UserLikes />} />
			<Route path="/photos/upload" element={<PhotoCrop />} />
			<Route
				path="/mobile"
				element={<GenericWallpaperHomepage currentSubreddit="mobilewallpapers"/>}
			/>
			<Route
				path="/sky"
				element={<GenericWallpaperHomepage currentSubreddit="skyporn"/>}
			/>
			<Route
				path="/city"
				element={<GenericWallpaperHomepage currentSubreddit="cityporn"/>}
			/>
			<Route
				path="/anime"
				element={<GenericWallpaperHomepage currentSubreddit="animewallpaper"/>}
			/>
		</Routes>
	);
};

export default AllRoutes;
