import React, { useState, useEffect } from "react";
import SearchForm from "../../common/SearchForm";
import LoadingSpinner from "../../common/LoadingSpinner";
import PhotoCard from "../photos/PhotoCard";
import "./Homepage.css";
import RedditApi from "../../api/RedditApi";

const GenericWallpaperHomepage = ({currentSubreddit}) => {
	// photoData: state array with data from api
	const [photoData, setPhotoData] = useState(null);
	
	// useEffect for getting popular when page opens
	useEffect(() => {
		// getPopular: Gets current popular wallpapers
		const getPopular = async () => {
			let redditData = await RedditApi.getPopular(currentSubreddit);
			setPhotoData(redditData);
		};
		getPopular();
	}, [currentSubreddit]);

	// search: Search wallpappers
	const search = async (searchTerm) => {
		let redditData = await RedditApi.search(searchTerm, currentSubreddit);
		setPhotoData(redditData);
	};
	
	// Handles loading
	if (!photoData) return <LoadingSpinner />;

	return (
		<div className="container">
			<div className="Homepage container row">
				<SearchForm searchFor={search} />
				{!photoData.length || (
					<div className="PhotoCard-list ">
						{photoData.map((p) => (p.data.post_hint === "image" &&
							<PhotoCard data={p.data} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default GenericWallpaperHomepage;
