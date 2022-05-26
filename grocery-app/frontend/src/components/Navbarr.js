//import React, { useState } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbarr = () => {

    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#home">React-Bootstrap</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="#">
                    Link
                </NavItem>
                <NavItem eventKey={2} href="#">
                    Link
                </NavItem>
            </Nav>
        </Navbar>
    )

} 

export default Navbarr