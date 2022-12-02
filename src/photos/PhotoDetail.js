import React, { useEffect, useState, useRef, useCallback } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import FlickrApi from "../api/FlickrApi";
import "./PhotoDetail.css";

const PhotoDetail = ({ id, closePhoto }) => {
	const photoBackgroundRef = useRef();
	const [photoData, setPhotoData] = useState({});
	const [doneLoading, setDoneLoading] = useState(false);

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
			className="photoBackground"
			ref={photoBackgroundRef}
			onClick={closeBackgroundClick}>
			<button className="close-modal" onClick={closePhoto}>
				X
			</button>
			<div className="container col-md-10 offset-md-2">
				<div className="card photoDetailContent">
					<div className="card-body">
						<h6 className="card-title"></h6>
						<img
							className="card-img h-3"
							src={`https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`}
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoDetail;
