import React, { useState, useEffect } from "react";
import FlickrApi from "../../api/FlickrApi";
import SearchForm from "../../common/SearchForm";
import LoadingSpinner from "../../common/LoadingSpinner";
import PhotoCard from "../photos/PhotoCard";
import "./Homepage.css";
import PhotoDetail from "../photos/PhotoDetail";

const Homepage = () => {
	const [photoData, setPhotoData] = useState(null);
	const [openPhotoModal, setOpenPhotoModal] = useState(false);
	const [photoId, setPhotoId] = useState(null);

	const getRecent = async () => {
		let picData = await FlickrApi.getRecent();
		setPhotoData(picData);
	};
	const search = async (searchTerm) => {
		let picData = await FlickrApi.search(searchTerm);
		setPhotoData(picData);
	};

	const getPhotoModal = (id) => {
		setOpenPhotoModal(true);
		setPhotoId(id);
	};

	useEffect(() => {
		getRecent();
	}, []);

	if (!photoData) return <LoadingSpinner />;

	return (
		<div className="container">
			<div className="Homepage container col-md-12">
				<SearchForm searchFor={search} />
				{photoData.length ? (
					<div className="PhotoCard-list ">
						{photoData.map((p) => (
							<PhotoCard
								server={p.server}
								id={p.id}
								secret={p.secret}
								getPhotoModal={getPhotoModal}
							/>
						))}
					</div>
				) : (
					<p className="lead">Sorry, no results were found!</p>
				)}
				{openPhotoModal && (
					<PhotoDetail
						id={photoId}
						closePhoto={() => setOpenPhotoModal(false)}
					/>
				)}
			</div>
		</div>
	);
};

export default Homepage;
