import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes/AllRoutes";
import LoadingSpinner from "./common/LoadingSpinner";
import useLocalStorage from "./hooks/useLocalStorage";
import WallPepperApi from "./api/WallPepperApi";
import { decodeToken } from "react-jwt";
import Navbar from "./components/Navbar/Navigationbar";
import UserContext from "./components/auth/UserContext";
import PhotoDetail from "./components/photos/PhotoDetail";

export const TOKEN_STORAGE_ID = "wallpepper-token";

function App() {
	// State to keep track of loading
	const [infoLoaded, setInfoLoaded] = useState(false);
	// Current user obj
	const [currentUser, setCurrentUser] = useState(null);
	// Token storage
	const [localStorageToken, setLocalStorageToken] = useLocalStorage(TOKEN_STORAGE_ID);
	// Users liked photos
	const [likedPhotos, setLikedPhotos] = useState(new Set());
	// openPhotoModal: state toggles modal
	const [openPhotoModal, setOpenPhotoModal] = useState(false);
	// photoModalData: state holds data for each modal
	const [photoModalData, setPhotoModalData] = useState({});

	/** Load UserInfo */
	useEffect(
		function loadUserInfo() {
			async function getCurrentUser() {
				if (localStorageToken) {
					try {
						let { username } = decodeToken(localStorageToken);
						WallPepperApi.token = localStorageToken;
						let currentUser = await WallPepperApi.getCurrentUser(username);
						setCurrentUser(currentUser);
						setLikedPhotos(new Set(currentUser.likes));
					} catch (err) {
						console.error("App load UserInfo: problem loading", err);
						setCurrentUser(null);
					}
				}
				setInfoLoaded(true);
			}
			setInfoLoaded(false);
			getCurrentUser();
		},
		[localStorageToken]
	);

	/** Handles signup */
	async function signup(signupData) {
		try {
			let token = await WallPepperApi.signup(signupData);
			setLocalStorageToken(token);
			return { success: true };
		} catch (err) {
			console.error("signup failed", err);
			return { success: false, err };
		}
	}
	/** Handle login */
	async function login(loginData) {
		try {
			let token = await WallPepperApi.login(loginData);
			setLocalStorageToken(token);
			return { success: true };
		} catch (err) {
			console.error("login failed", err);
			return { success: false, err };
		}
	}
	/** Handles Logout */
	const logout = () => {
		setCurrentUser(null);
		setLocalStorageToken(null);
	};

	/** Check if photo has been liked */
	const hasBeenLiked = (permaLink) => {
		return likedPhotos.has(permaLink);
	};

	const toggleLike = (permaLink) => {
		if (hasBeenLiked(permaLink)) {
			WallPepperApi.unlike(currentUser.username, permaLink);
			likedPhotos.delete(permaLink);
			setLikedPhotos(new Set([...likedPhotos]));
		} else {
			WallPepperApi.like(currentUser.username, permaLink);
			setLikedPhotos(new Set([...likedPhotos, permaLink]));
		}
	};
	// getPhotoModal: handles state for modal
	const getPhotoModal = (data) => {
		setOpenPhotoModal(true);
		setPhotoModalData(data);
	};
	// Checks loading
	if (!infoLoaded) return <LoadingSpinner />;

	return (
		<div className="App">
			<BrowserRouter>
				<UserContext.Provider
					value={{
						currentUser,
						setCurrentUser,
						toggleLike,
						hasBeenLiked,
						likedPhotos,
						photoModalData,
						setPhotoModalData,
						openPhotoModal,
						setOpenPhotoModal,
						getPhotoModal,
					}}>
					<Navbar logout={logout} />
					<AllRoutes login={login} signup={signup} />
					{openPhotoModal && <PhotoDetail
							photoModalData={photoModalData}
							closePhoto={() => setOpenPhotoModal(false)}
						/>}
				</UserContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
