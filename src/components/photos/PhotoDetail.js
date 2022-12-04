import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";
import FlickrApi from "../../api/FlickrApi";
import "./PhotoDetail.css";
import WallPepperApi from "../../api/WallPepperApi";
import UserContext from "../auth/UserContext";

const PhotoDetail = ({ id, closePhoto }) => {
	const photoBackgroundRef = useRef();
	const { currentUser } = useContext(UserContext);
	const [photoData, setPhotoData] = useState({});
	const [doneLoading, setDoneLoading] = useState(false);

	const likePic = async (url) => {
		try {
			let { username } = currentUser;
			await WallPepperApi.like(username, url);
		} catch (err) {
			console.error("like failed");
			return { success: false, err };
		}
	};

	// Get photo data when page loads
	useEffect(() => {
		const getPhotoData = async () => {
			const res = await FlickrApi.getInfo(id);
			setPhotoData(res);
		};
		getPhotoData();
		setDoneLoading(true);
	}, [id]);

	// Uses ref to close based on clicking background
	const closeBackgroundClick = (e) => {
		if (photoBackgroundRef.current === e.target) {
			closePhoto();
		}
	};

	// Closes based on pressing esc key
	const closeEscPress = useCallback(
		(e) => {
			if (e.key === "Escape") closePhoto();
		},
		[closePhoto]
	);

	// useEffect so it doesn't keep happening
	useEffect(() => {
		document.addEventListener("keydown", closeEscPress);
		return () => document.removeEventListener("keydown", closeEscPress);
	}, [closeEscPress]);

	// If loading show loading spinner
	if (!doneLoading) return <LoadingSpinner />;

	return (
		<div
			className="photo-background"
			ref={photoBackgroundRef}
			onClick={closeBackgroundClick}>
			<button className="close-modal" onClick={closePhoto}>
				X
			</button>
			<div className="container col-md-10 offset-md-2">
				<div className="card photo-detail-content">
					<div className="card-body">
						<h6 className="card-title"></h6>
						<img
							className="card-img h-3"
							src={`https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`}
							alt=""
						/>
						<Link
							to="/photos/upload"
							state={{
								image: `https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`,
							}}>
							Crop
						</Link>
						<button
							onClick={() => likePic(
								`https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`
							)}>
							Like
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoDetail;
