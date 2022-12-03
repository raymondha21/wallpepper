import React from "react";

const PhotoCard = ({ server, id, secret, getPhotoModal }) => {
	return (
		<div
			className="PhotoCard card d-inline-block m-1"
			onClick={() => getPhotoModal(id)}>
			<div className="card-body">
				<h6 className="card-title">
					<img
						className="card-img"
						style={{ height: "100%", objectFit: "cover" }}
						src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
						alt=""
					/>
				</h6>
			</div>
		</div>
	);
};

export default PhotoCard;
