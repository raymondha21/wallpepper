import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	Crop,
	PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

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
	console.log(location);
	const [imgSrc, setImgSrc] = useState(location.state?.image || "");
	const previewCanvasRef = useRef(null);
	const imgRef = useRef(null);
	const [crop, setCrop] = useState();
	const [completedCrop, setCompletedCrop] = useState();
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [aspect, setAspect] = useState(16 / 9);

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
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
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
		[completedCrop, scale, rotate]
	);

	function handleToggleAspectClick() {
		if (aspect) {
			setAspect(undefined);
		} else if (imgRef.current) {
			const { width, height } = imgRef.current;
			setAspect(16 / 9);
			setCrop(centerAspectCrop(width, height, 16 / 9));
		}
	}

	return (
		<div className="PhotoCrop">
			<div className="SearchForm mb-4">
				<input
					className="form-inline"
					type="file"
					accept="image/*"
					onChange={onSelectFile}
				/>
				<div>
					<label htmlFor="scale-input">Scale: </label>
					<input
						cl
						id="scale-input"
						type="number"
						step="0.1"
						value={scale}
						disabled={!imgSrc}
						onChange={(e) => setScale(Number(e.target.value))}
					/>
				</div>
				<div>
					<label htmlFor="rotate-input">Rotate: </label>
					<input
						id="rotate-input"
						type="number"
						value={rotate}
						disabled={!imgSrc}
						onChange={(e) =>
							setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
						}
					/>
				</div>
				<div>
					<button
						className="btn btn-md btn-primary "
						onClick={handleToggleAspectClick}>
						Toggle aspect {aspect ? "off" : "on"}
					</button>
				</div>
			</div>
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
			<div>
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
			</div>
		</div>
	);
}

export default PhotoCrop;
