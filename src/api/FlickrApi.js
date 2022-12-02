import axios from "axios";

const BASE_URL = "https://www.flickr.com/services/rest/?method=";
const API_KEY = "3a530475fe722de8e52737e634138567";

/** API Class.
 *
 * Static class tying together methods used to get/send to Flickr API.
 */

class FlickrApi {
	static async request(endpoint, method = "get", parameters = {}) {
		console.debug("API Call:", endpoint, method);

		//there are multiple ways to pass an authorization token, this is how you pass it in the header.
		//this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
		const url = `${BASE_URL}${endpoint}`;

		const params = {
			...parameters,
			api_key: API_KEY,
			format: "json",
			safety_level: 1,
		};

		try {
			return (await axios({ url, method, params })).data;
		} catch (err) {
			console.error("API Error:", err.response);
		}
	}
	static parse(data) {
		return JSON.parse(
			data.substring(0, data.length - 1).replace("jsonFlickrApi(", "")
		);
	}
	// Individual API routes

	// Get info on current user
	static async getRecent() {
		let res = await this.request("flickr.tags.getClusterPhotos", "get", {
			tag: "scenery",
		});
		return this.parse(res).photos.photo;
	}

	static async search(searchTerm) {
		let searchObj = { text: searchTerm, tag: "wallpaper" };
		let res = await this.request("flickr.photos.search", "get", searchObj);
		return this.parse(res).photos.photo;
	}
	static async getInfo(id) {
		let searchObj = { photo_id: id };
		let res = await this.request("flickr.photos.getInfo", "get", searchObj);
		return this.parse(res).photo;
	}
}

export default FlickrApi;
