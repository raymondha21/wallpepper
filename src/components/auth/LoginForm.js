import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Container,
	Row,
	Col,
} from "reactstrap";
import Alert from "../../common/Alert";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState([]);
	const navigate = useNavigate();

	console.debug(
		"LoginForm",
		"login=",
		typeof login,
		"formData=",
		formData,
		"formErrors",
		formErrors
	);

	/** Handle form submit:
	 *
	 * Calls login func prop and, if successful, redirect to /companies.
	 */

	async function handleSubmit(evt) {
		evt.preventDefault();
		let result = await login(formData);
		if (result.success) {
			navigate('/');
		} else {
			setFormErrors(result.errors);
		}
	}

	/** Update form data field */
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData((l) => ({ ...l, [name]: value }));
	}

	return (
		<Container className="LoginForm">
			<Row className="justify-content-center">
				<Col md={6} lg={4}>
					<h3 className="mb-3">Log In</h3>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for="username">Username</Label>
							<Input
								type="text"
								name="username"
								id="username"
								value={formData.username}
								onChange={handleChange}
								autoComplete="username"
								required
							/>
						</FormGroup>
						<FormGroup>
							<Label for="password">Password</Label>
							<Input
								type="password"
								name="password"
								id="password"
								value={formData.password}
								onChange={handleChange}
								autoComplete="password"
								required
							/>
						</FormGroup>

						{formErrors.length ? (
							<Alert type="danger" messages={formErrors} />
						) : null}

						<Button type="submit" color="primary" className="float-right">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}

export default LoginForm;
