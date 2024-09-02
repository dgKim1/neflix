import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import style from "../layout/AppLayout.style.css";
import { MdOutlineMenu } from "react-icons/md";

function AppLayout() {
  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
  }
  return (
    <div>
      <Navbar className="netflix-navbar">
        <Container className="nav-container">
          <Link to="/">
            <Navbar.Brand id="netflix-logo">
              <img
                src="https://about.netflix.com/images/logo.png"
                width={150}
              />
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto com-nav">
            <Link to="/" className="menu-home">
              Home
            </Link>
            <Link to="/movies" className="menu-movies">
              Movies
            </Link>
          </Nav>
          <Form className="d-flex search-box-com">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-danger">Search</Button>
          </Form>
          <div id="mySidenav" className="sidenav">
            <a href="#" onClick={closeNav} className="closebtn">
              &times;
            </a>
            <a href="/">Home</a>
            <a href="/movies">Movies</a>
          </div>
          <button onClick={openNav} className="sidenav-bttn">
            <MdOutlineMenu />
          </button>
        </Container>
      </Navbar>
      <Nav className="me-auto mobile-nav">
        <Link to="/" className="menu-home">
          Home
        </Link>
        <Link to="/movies" className="menu-movies">
          Movies
        </Link>
      </Nav>
      <Outlet />
    </div>
  );
}

export default AppLayout;
