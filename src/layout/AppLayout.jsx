import React from 'react'
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import style from "../layout/AppLayout.style.css";


function AppLayout() {
  return (
    <div>
    <Navbar  className='netflix-navbar'>
      <Container>
        <Link to='/'><Navbar.Brand  id='netflix-logo'><img src='https://about.netflix.com/images/logo.png' width={150}/></Navbar.Brand></Link>
          <Nav className="me-auto">
          <Link to="/" className='menu-home' >Home</Link>
          <Link to="/movies" className='menu-movies'>Movies</Link>         
          </Nav>
        <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-danger">Search</Button>
                </Form>
      </Container>
    </Navbar>
    <Outlet/>
    </div>
  )
}

export default AppLayout
