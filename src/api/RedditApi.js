import axios from "axios";

const BASE_URL = "https://www.reddit.com";

/** API Class.
 *
 * Static class tying together methods used to get/send to Flickr API.
 */

class RedditApi {
	static async request(endpoint, method = "get") {
		const url = `${BASE_URL}/${endpoint}`;

		try {
			return (await axios({ url, method })).data;
		} catch (err) {
			console.error("API Error:", err.response);
		}
	}
	// Individual API routes

	// Get info on current user
	static async getPopular(subreddit, lastId = "") {
		let res = await this.request(`/r/${subreddit}.json?limit=25&${lastId}`);
		return res.data.children;
	}

	static async search(searchTerm, subreddit, lastId = "") {
		let res = await this.request(
			`/r/${subreddit}/search.json?q=${searchTerm}&restrict_sr=1&limit=25&${lastId}`
		);
		console.log(res);
		return res.data.children;
	}

	static async getThread(link) {
		let url = link.slice(0, -1);
		let res = await this.request(`${url}.json`);
		return res[0].data.children[0].data;
	}
}

export default RedditApi;
