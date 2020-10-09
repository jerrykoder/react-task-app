import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

const Navigation = () => {
	return (
		<Navbar color="light" light expand="md">
			<NavbarBrand href="/">reactstrap</NavbarBrand>
			<NavbarToggler />
			<Collapse navbar>
				<Nav className="ml-auto" navbar>
					<NavItem>
						<Link className="nav-link" to="/">
							Home
						</Link>
					</NavItem>
					<NavItem>
						<Link className="nav-link" to="/about">
							About
						</Link>
					</NavItem>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default Navigation;
