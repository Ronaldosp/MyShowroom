import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";

function NavBar(){
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.clear()
        navigate('/login')
    }

    return <div>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>My Showroom</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavLink to='/' className="nav-link">Home</NavLink>
                {/* <NavLink to='/brand' className="nav-link" >Brands</NavLink> */}
                <NavLink to='/categories' className="nav-link" >Categories</NavLink>
                <NavLink to='/cars' className="nav-link" >Add Cars</NavLink>
            </Nav>
            <Nav className="ms-auto">
            <NavLink to='/register' className="nav-link d-flex-end" >Register</NavLink>
            <Button onClick={handleLogout} variant="outline-danger" >Logout</Button>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
}

export default NavBar;