import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import "../styling/Navbar.scss"

function NavBar(){
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("access_token");
    const handleLogout = ()=>{
        localStorage.clear()
        navigate('/login')
    }

    return <div>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand as={Link} to="/">My Showroom Admin</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto navbar-center">
                <NavLink to='/brands' className="nav-link">Brands</NavLink>
                <NavLink to='/categories' className="nav-link" >Categories</NavLink>
                <NavLink to='/cars' className="nav-link" >Cars</NavLink>
                <NavLink to='/featurecategories' className="nav-link" >Feature Categories</NavLink>
                <NavLink to='/specificationcategories' className="nav-link" >Specification Categories</NavLink>
            </Nav>
            <Nav className="ms-auto">
                <NavLink to="/register" className="nav-link">
                    Register
                </NavLink>
                <Button onClick={handleLogout} variant="danger">
                    Logout
                </Button>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
}

export default NavBar;