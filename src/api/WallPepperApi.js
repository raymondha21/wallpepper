import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to own WallPepper API.

 */

class WallPepperApi {
	// the token for interactive with the API will be stored here.
	static token;

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);

		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${WallPepperApi.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	// Individual API routes

	// Get info on current user
	static async getCurrentUser(user) {
		let res = await this.request(`users/${user}`);
		return res.user;
	}

	// Sign up
	static async signup(data) {
		let res = await this.request(`auth/register`, data, "post");
		return res.token;
	}

	// Login
	static async login(data) {
		let res = await this.request("auth/token", data, "post");
		return res.token;
	}

	// Edit profile save
	static async saveProfile(user, data) {
		let res = await this.request(`users/${user}`, data, "patch");
		return res.user;
	}

	// Add picture to likes
	static async like(user, url) {
		await this.request(`users/${user}/likes`, { url } , "post");
	}
	// Remove picture from likes
	static async unlike(user, url) {
		await this.request(`users/${user}/likes`, { url }, "delete");
	}
}

export default WallPepperApi;
