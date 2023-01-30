import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import "./PhotoDetail.css";
import UserContext from "../auth/UserContext";

const PhotoDetail = ({ photoModalData, closePhoto }) => {
	const photoBackgroundRef = useRef();
	const {  toggleLike, hasBeenLiked, setOpenPhotoModal } = useContext(UserContext);
	const [liked, setLiked] = useState(hasBeenLiked(photoModalData.permalink));
	
	// Handles crop
	const handleCrop = () => {
		setOpenPhotoModal(false);
	}
	// Handles like
	const handleLike = () => {
		toggleLike(photoModalData.permalink);
		setLiked(!liked);
	}

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


	return (
		<div
			className="photo-background"
			ref={photoBackgroundRef}
			onClick={closeBackgroundClick}>
			<button className="close-modal" onClick={closePhoto}>
				X
			</button>
			<div className="container">
				<div className="card photo-detail-content">
					<div className="card-body">
						<h6 className="card-title">{photoModalData.title}</h6>
						<img
							className="card-img h-5 col-md-2 p-2"
							src={photoModalData.url}
							alt=""
						/>
						<Link
							to="/photos/upload"
							state={{
								image: photoModalData.url,
							}}
							onClick={() => handleCrop()}
							className="btn btn-secondary ">
							Crop
						</Link>
						{!liked ? (
							<button onClick={() => handleLike()} className="btn btn-primary m-1">
								Like
							</button>
						) : (
							<button onClick={() => handleLike()} className="btn btn-danger m-1">
								Unlike
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoDetail;
