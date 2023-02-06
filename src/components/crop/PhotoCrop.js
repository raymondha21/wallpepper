import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import {
	FormGroup,
	Label,
	Input,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from "reactstrap";
import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.

function PhotoCrop() {
	const location = useLocation();
	const [imgSrc, setImgSrc] = useState(location.state?.image || "");
	const previewCanvasRef = useRef(null);
	const imgRef = useRef(null);
	const [crop, setCrop] = useState();
	const [completedCrop, setCompletedCrop] = useState();
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [aspect, setAspect] = useState();
	const [defaultAspect, setDefaultAspect] = useState();

	function onSelectFile(e) {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();
			reader.addEventListener("load", () =>
				setImgSrc(reader.result?.toString() || "")
			);
			reader.readAsDataURL(e.target.files[0]);
		}
	}

	function onImageLoad(e) {
		const { width, height } = e.currentTarget;
		setCrop(centerAspectCrop(width, height, width / height));
		setAspect(width / height);
		setDefaultAspect(width / height);
		
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current &&
				aspect
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate
				);
			}
		},
		100,
		[completedCrop, scale, rotate, aspect,handleToggleAspectClick]
	);

	function handleToggleAspectClick(e) {
		if (aspect) {
			setAspect(undefined);
		}
		if (imgRef.current) {
			const { width, height } = imgRef.current;
			setAspect(e.target.value);
			setCrop(centerAspectCrop(width, height, e.target.value));
		}
	}

	return (
		<Container className="pt-2">
			<h2 className="p-2">Image Cropper</h2>
			<div className="PhotoCrop">
				<Row className="p-4">
					<Col>
						<FormGroup className="SearchForm mb-4">
							<FormGroup className="d-flex align-items-center">
								<Label for="scale-input" className="mr-2">
									Scale:
								</Label>
								<Input
									type="number"
									id="scale-input"
									step="0.1"
									value={scale}
									disabled={!imgSrc}
									onChange={(e) => setScale(Number(e.target.value))}
								/>
							</FormGroup>
							<FormGroup className="d-flex align-items-center">
								<Label for="rotate-input" className="mr-2">
									Rotate:
								</Label>
								<Input
									type="number"
									id="rotate-input"
									value={rotate}
									disabled={!imgSrc}
									onChange={(e) =>
										setRotate(
											Math.min(180, Math.max(-180, Number(e.target.value)))
										)
									}
								/>
							</FormGroup>
							<FormGroup className="d-flex align-items-center">
								<Label for="aspectSelect">Aspect:</Label>
								<Input
									type="select"
									id="aspectSelect"
									value={aspect}
									onChange={handleToggleAspectClick}>
									<option value={defaultAspect} selected>Default</option>
									<option value={16 / 9}>16:9</option>
									<option value={4 / 3}>4:3</option>
									<option value={1}>1</option>
								</Input>
							</FormGroup>
						</FormGroup>
					</Col>
					<Col>
						<Input
							type="file"
							accept="image/*"
							onChange={onSelectFile}
							className="mb-2"
						/>
					</Col>
				</Row>

				<Row>
					<Col xs="12" md="6">
						{!!imgSrc && (
							<ReactCrop
								crop={crop}
								onChange={(_, percentCrop) => setCrop(percentCrop)}
								onComplete={(c) => setCompletedCrop(c)}
								aspect={aspect}>
								<img
									ref={imgRef}
									alt="Crop me"
									src={imgSrc}
									style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
									onLoad={onImageLoad}
								/>
							</ReactCrop>
						)}
					</Col>
					<Col xs="12" md="6">
						{!!completedCrop && (
							<canvas
								ref={previewCanvasRef}
								style={{
									border: "1px solid black",
									objectFit: "contain",
									width: completedCrop.width,
									height: completedCrop.height,
								}}
							/>
						)}
					</Col>
				</Row>
			</div>
		</Container>
	);
}

export default PhotoCrop;
