import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import { jwtDecode } from "jwt-decode";
import { fetchDealerUserProfile } from "../store/action/actionCreator";

function NavBar(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dealerProfile = useSelector(
        (state) => state.dealerReducer.dealerProfiles
    );

    const token = localStorage.getItem("access_token");
    const [decodedUser, setDecodedUser] = useState(null);

    useEffect(() => {
        if (token) {
        try {
            const decoded = jwtDecode(token);
            setDecodedUser(decoded);
        } catch (err) {
            console.error("Invalid token");
        }
        }
    }, [token]);

    useEffect(() => {
        if (decodedUser?.role === "dealer") {
        dispatch(fetchDealerUserProfile(decodedUser.id));
        }
    }, [dispatch, decodedUser?.id]); 

    const isDealer = decodedUser?.role === "dealer";

    const hasDealerProfile = !!dealerProfile;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };


    return <div>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand>My Showroom</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavLink to='/' className="nav-link">Home</NavLink>
                <NavLink to='/listing' className="nav-link" >List Page</NavLink>
                
                {isDealer && !hasDealerProfile && (
                    <NavLink to="/dealer" className="nav-link">
                        Create Dealer Profile
                    </NavLink>
                )}

                {isDealer && hasDealerProfile && (
                    <NavLink to="/dealer" className="nav-link">
                        Update Dealer Profile
                    </NavLink>
                )}
                
                {isDealer && (
                    <NavLink to="/addcar" className="nav-link">
                        Add Cars
                    </NavLink>
                )}
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