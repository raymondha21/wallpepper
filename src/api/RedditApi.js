import axios from "axios";

const BASE_URL = "https://www.reddit.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to Flickr API.
 */

class RedditApi {
   static token;

	static async request(endpoint, method = "get") {
		console.debug("API Call:", endpoint, method);

		const url = `${BASE_URL}/${endpoint}`;

		try {
			return (await axios({ url, method })).data;
		} catch (err) {
			console.error("API Error:", err.response);
		}
	}
	// Individual API routes

	// Get info on current user
	static async getPopular(subreddit) {
		let res = await this.request(`/r/${subreddit}.json`);
		return res.data.children;
	}

	static async search(searchTerm) {
		let res = await this.request(`/r/wallpapers/search.json?q=${searchTerm}&restrict_sr=1`);
		return res.data.children;
	}

	static async getThread(link) {
		let url = link.slice(0, -1);
		let res = await this.request(`${url}.json`);
		return res[0].data.children[0].data;
	}

}

export default RedditApi;
