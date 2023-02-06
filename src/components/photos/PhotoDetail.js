import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import {
	Modal,
	ModalHeader,
	ModalBody,
	Card,
	CardImg,
	CardBody,
	Button,
	Row,
	Col
} from "reactstrap";
import "./PhotoDetail.css";
import UserContext from "../auth/UserContext";

const PhotoDetail = ({ photoModalData, closePhoto }) => {
	const photoBackgroundRef = useRef();
	const { toggleLike, hasBeenLiked, setOpenPhotoModal } =
		useContext(UserContext);
	const [liked, setLiked] = useState(hasBeenLiked(photoModalData.permalink));
	const [modalOpen, setModalOpen] = useState(true);

	// Handles crop
	const handleCrop = () => {
		setOpenPhotoModal(false);
		setModalOpen(false);

	};

	// Handles like
	const handleLike = () => {
		toggleLike(photoModalData.permalink);
		setLiked(!liked);
	};

	// Uses ref to close based on clicking background
	const closeBackgroundClick = (e) => {
		if (photoBackgroundRef.current === e.target) {
			closePhoto();
			setModalOpen(false);
		}
	};

	// Closes based on pressing esc key
	const closeEscPress = useCallback(
		(e) => {
			if (e.key === "Escape") {
				closePhoto();
				setModalOpen(false);
			}
		},
		[closePhoto]
	);

	// useEffect so it doesn't keep happening
	useEffect(() => {
		document.addEventListener("keydown", closeEscPress);
		return () => document.removeEventListener("keydown", closeEscPress);
	}, [closeEscPress]);

	return (
		<Modal
			isOpen={modalOpen}
			toggle={closePhoto}
			size="xl"
			fullscreen="lg"
			centered>
			<ModalHeader toggle={closePhoto}>{photoModalData.title}</ModalHeader>
			<ModalBody>
				<Row>
					<Col xs="12" md="6">
						<CardImg src={photoModalData.url} alt="" />
					</Col>
					<Col xs="12" md="6">
						<CardBody>
							<Button
								onClick={handleLike}
								className="m-1"
								color={liked ? "danger" : "primary"}>
								{liked ? "Unlike" : "Like"}
							</Button>
							<Link
								to="/photos/upload"
								state={{ image: photoModalData.url }}
								onClick={handleCrop}
								className="btn btn-secondary m-1">
								Crop
							</Link>
							<a href={photoModalData.url} className="btn btn-success m-1">
								See Original
							</a>
						</CardBody>
					</Col>
				</Row>
			</ModalBody>
		</Modal>
	);




};

export default PhotoDetail;
