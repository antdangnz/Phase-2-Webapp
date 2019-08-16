import * as React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {

    function logOut() {

        // MIGHT REMOVE THIS so it transitions more fluidly. Refreshes are really trashing the look
        // Ghetto way to log out for now.
        localStorage.removeItem('userLoggedIn');
        window.history.pushState(null, "", '/login')
        window.location.reload();
    }

    if (localStorage.getItem('userLoggedIn') !== null && localStorage.getItem('userLoggedIn') === 'true') {
        return (
            <Navbar inverse={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#" className="navbar-left"><img src="./study.png" width="27px" alt="Question Collection Logo"/></a>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/dashboard">Question Collection</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight={true}>
                    <IndexLinkContainer to="/dashboard">
                        <NavItem>Profile</NavItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to="/help">
                        <NavItem>Help</NavItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to="/login" onSelect={logOut}>
                        <NavItem>Log Out</NavItem>
                    </IndexLinkContainer>
                </Nav>
            </Navbar>
        );
    } else {
        return (
            <Navbar inverse={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#" className="navbar-left"><img src="./study.png" width="27px" alt="Question Collection Logo"/></a>
                    </Navbar.Brand>
                    <Navbar.Brand>
                        <Link to="/login">Question Collection</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight={true}>
                    <IndexLinkContainer to="/login">
                        <NavItem>Login</NavItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to="/register">
                        <NavItem>Register</NavItem>
                    </IndexLinkContainer>
                    <IndexLinkContainer to="/help">
                        <NavItem>Help</NavItem>
                    </IndexLinkContainer>
                </Nav>
            </Navbar>
        );
    }

}