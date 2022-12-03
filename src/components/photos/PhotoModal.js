// import React, { useState } from "react";
// import "./PhotoModal.css";

// export default function PhotoModal() {
// 	// State for toggling modal
// 	const [photoModal, setPhotoModal] = useState(false);

// 	// Function to toggle modal
// 	const togglePhotoModal = () => {
// 		setPhotoModal(!photoModal);
// 		photoModal
// 			? document.body.classList.add("active-modal")
// 			: document.body.classList.remove("active-modal");
// 	};

// 	return (
// 		<>
// 			<button onClick={togglePhotoModal} className="btn-modal">
// 				Open
// 			</button>

// 			{photoModal && (
// 				<div className="modal">
// 					<div onClick={togglePhotoModal} className="overlay"></div>
// 					<div className="modal-content">
// 						<h2>Hello Modal</h2>
// 						<p>
// 							Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
// 							perferendis suscipit officia recusandae, eveniet quaerat assumenda
// 							id fugit, dignissimos maxime non natus placeat illo iusto!
// 							Sapiente dolorum id maiores dolores? Illum pariatur possimus
// 							quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
// 							placeat tempora vitae enim incidunt porro fuga ea.
// 						</p>
// 						<button className="close-modal" onClick={togglePhotoModal}>
// 							CLOSE
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// }
