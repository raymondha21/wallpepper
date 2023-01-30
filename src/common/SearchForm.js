import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
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
		<Form className="mb-4" onSubmit={handleSubmit}>
			<FormGroup>
				<Input
					type="text"
					name="searchTerm"
					placeholder="Search"
					value={searchTerm}
					onChange={handleChange}
				/>
			</FormGroup>
			<Link className="btn btn-secondary p-2 m-2" to="/photos/upload">
				Upload your own!
			</Link>
			<Button type="submit" color="primary">
				Search
			</Button>
		</Form>
	);
}

export default SearchForm;
