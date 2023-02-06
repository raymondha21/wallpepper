import React, { useState, useEffect } from "react";
import SearchForm from "../../common/SearchForm";
import LoadingSpinner from "../../common/LoadingSpinner";
import PhotoCard from "../photos/PhotoCard";
import "./Homepage.css";
import RedditApi from "../../api/RedditApi";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const GenericWallpaperHomepage = ({currentSubreddit}) => {
	// photoData: state array with data from api
	const [photoData, setPhotoData] = useState(null);
	const [lastPhotoId, setLastPhotoId] = useState(null);
	const [isFetching, setIsFetching] = useInfiniteScroll(getMorePhotos);
	const [searchTermData, setSearchTermData] = useState(null);
	
	// useEffect for getting popular when page opens
	useEffect(() => {
		// getPopular: Gets current popular wallpapers
		const getPopular = async () => {
			let redditData = await RedditApi.getPopular(currentSubreddit);
			setPhotoData(redditData);
			setLastPhotoId(redditData[redditData.length - 1].data.id);
		};
		getPopular();
	}, [currentSubreddit]);

	async function getMorePhotos() {
		let redditData = searchTermData
			? await RedditApi.search(
					searchTermData,
					currentSubreddit,
					`after=t3_${lastPhotoId}`
			  )
			: await RedditApi.getPopular(currentSubreddit, `after=t3_${lastPhotoId}`);
		setPhotoData([...photoData, ...redditData]);
		setLastPhotoId(redditData[redditData.length - 1].data.id);
		setIsFetching(false);
	}
	// search: Search wallpappers
	const search = async (searchTerm) => {
		let redditData = await RedditApi.search(searchTerm, currentSubreddit);
		setPhotoData([...redditData]);
		setLastPhotoId(redditData[redditData.length - 1].data.id);
		setSearchTermData(searchTerm);
	};
	
	// Handles loading
	if (!photoData) return <LoadingSpinner />;

	return (
		<div className="container">
			<div className="Homepage container row">
				<SearchForm searchFor={search} />
				{!photoData.length || (
					<div className="PhotoCard-list">
						{photoData.map((p) => (p.data.post_hint === "image" &&
							<PhotoCard data={p.data} key={ p.data.id } />
						))}
					</div>
				)}
				{isFetching && <LoadingSpinner/>}
			</div>
		</div>
	);
};

export default GenericWallpaperHomepage;
