import React, { useContext } from "react";
import UserContext from "../auth/UserContext";

const PhotoCard = ({ data }) => {
	const { getPhotoModal } = useContext(UserContext);
	
	return (
		<div
			className="PhotoCard card d-inline-block m-1 col-md-5"
			onClick={() => getPhotoModal(data)}
			key={data.id}>
			<div className="card-body">
				<h6 className="card-title">
					<img
						className="card-img"
						style={{ height: "100%", objectFit: "cover" }}
						src={data.url}
						alt=""
					/>
				</h6>
			</div>
		</div>
	);
};

export default PhotoCard;
