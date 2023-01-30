import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import RedditApi from "../../api/RedditApi";
import PhotoCard from "../photos/PhotoCard";

const UserLikes = () => {
   const { likedPhotos } = useContext(UserContext);
   const [userLikedPics, setUserLikedPics] = useState([]);
   
	useEffect(() => {
			async function getUserLikedPics() {
				let photoData = [];
				likedPhotos.forEach(async (likedPhoto) => {
					let currentPic = await RedditApi.getThread(likedPhoto);
					photoData = [...photoData, currentPic];
					setUserLikedPics(photoData);
				});
			}
			getUserLikedPics();
		}, [likedPhotos]);
   
   return (
			<div>
				<h4>User likes:</h4>
				{userLikedPics.length ? (
					<div className="PhotoCard-list ">
						{userLikedPics.map((l) => (
							<PhotoCard data={l} />
						))}
					</div>
				) : (
					<p className="lead">Sorry, you haven't liked anything yet!</p>
				)}
			</div>
		);
}

export default UserLikes;