import React, { useContext, useState } from "react";
import WallPepperApi from "../../api/WallPepperApi";
import UserContext from "../auth/UserContext";
import Alert from "../../common/Alert";

/** Profile editting form
 *
 * Displays form filled in and handles changes
 */
const UserProfile = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const [formData, setFormData] = useState({
		username: currentUser.username,
		firstName: currentUser.firstName,
		lastName: currentUser.lastName,
		email: currentUser.email,
		password: "",
	});

	const [displaySaveAlert, setDisplaySaveAlert] = useState(false);

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((f) => ({
			...f,
			[name]: value,
		}));
	}

	async function handleSubmit(evt) {
		evt.preventDefault();

		let username = currentUser.username;
		let updatedUser;

		try {
			updatedUser = await WallPepperApi.saveProfile(username, formData);
		} catch (err) {
			debugger;
		}

		setFormData((f) => ({ ...f, password: "" }));
		setCurrentUser(updatedUser);
		setDisplaySaveAlert(true);
	}
	return (
		<div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
			<h3>Profile</h3>
			<div className="card">
				<div className="card-body">
					<form>
						<div className="form-group">
							<h4>{formData.username}</h4>
						</div>
						<div className="form-group">
							<label>First Name</label>
							<input
								name="firstName"
								className="form-control"
								value={formData.firstName}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Last Name</label>
							<input
								name="lastName"
								className="form-control"
								value={formData.lastName}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Email</label>
							<input
								name="email"
								className="form-control"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="form-group">
							<label>Confirm password to make changes:</label>
							<input
								type="password"
								name="password"
								className="form-control"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>

						{displaySaveAlert ? (
							<Alert type="success" messages={["Updated successfully."]} />
						) : null}
						<button
							className="btn btn-primary btn-block mt-4"
							onClick={handleSubmit}>
							Save Changes
						</button>
					</form>
				</div>
			</div>
			<div>
				<h4>User likes:</h4>
				{currentUser.likes.length ? (
					<div className="PhotoCard-list ">
						{currentUser.likes.map((l) => (
							<img src={l.url}></img>
						))}
					</div>
				) : (
					<p className="lead">Sorry, no results were found!</p>
				)}
			</div>
		</div>
	);
};

export default UserProfile;
