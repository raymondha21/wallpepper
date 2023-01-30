import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import {
	Navbar,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	NavbarBrand,
	Nav,
	NavItem,
	UncontrolledDropdown,
	NavLink,
} from "reactstrap";
import "./Navigationbar.css";

const Navigationbar = ({ logout }) => {
	const { currentUser } = useContext(UserContext);

	const loggedInNav = () => {
		return (
			<>

					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							{currentUser.username}
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem href="/profile">Edit Profile</DropdownItem>
							<DropdownItem href="/profile/likes">Likes</DropdownItem>
							<DropdownItem divider />
							<DropdownItem href="/" onClick={logout}>
								Logout
							</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
				
			</>
		);
	};

	const loggedOutNav = () => {
		return (
			<>
					<NavItem>
					<NavLink href="/login">
						Login
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="/signup">
						Signup
					</NavLink>
				</NavItem>
				
			</>
		);
	};

	return (
		<div>
			<Navbar container="lg">
				<NavbarBrand href="/">WallPepper</NavbarBrand>
				<Nav tabs fill>
					<NavItem nav>
						<NavLink href="/mobile">Mobile</NavLink>
					</NavItem>
					<UncontrolledDropdown nav inNavbar>
						<DropdownToggle nav caret>
							Categories
						</DropdownToggle>
						<DropdownMenu>
							<DropdownItem href="/sky">Sky Wallpapers</DropdownItem>
							<DropdownItem href="/city">City Wallpapers</DropdownItem>
							<DropdownItem href="/anime">Anime Wallpapers</DropdownItem>
						</DropdownMenu>
					</UncontrolledDropdown>
					<NavItem nav>
						<NavLink href="/photos/upload">Upload</NavLink>
					</NavItem>
					{currentUser ? loggedInNav() : loggedOutNav()}
				</Nav>
			</Navbar>
		</div>
	);
};

export default Navigationbar;
