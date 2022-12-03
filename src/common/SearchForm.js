import React, { useState } from "react";
import "./SearchForm.css";
import { Link } from "react-router-dom";

/** Search widget.
 *
 * Appears on CompanyList and JobList so that these can be filtered
 * down.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
	console.debug("SearchForm", "searchFor=", typeof searchFor);

	const [searchTerm, setSearchTerm] = useState("");

	/** Tell parent to filter */
	function handleSubmit(evt) {
		// take care of accidentally trying to search for just spaces
		evt.preventDefault();
		searchFor(searchTerm.trim() || undefined);
		setSearchTerm(searchTerm.trim());
	}

	/** Update form fields */
	function handleChange(evt) {
		setSearchTerm(evt.target.value);
	}

	return (
		<div className="SearchForm mb-4">
			<form className="form-inline" onSubmit={handleSubmit}>
				<input
					className="form-control form-control-lg flex-grow-1"
					name="searchTerm"
					placeholder="Search all wallpapers"
					value={searchTerm}
					onChange={handleChange}
				/>
				<Link className="btn btn-lg btn-secondary p-2 m-2" to="/photos/upload">
					Upload your own!
				</Link>
				<button type="submit" className="btn btn-lg btn-primary">
					Search
				</button>
			</form>
		</div>
	);
}

export default SearchForm;
