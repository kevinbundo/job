import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem} from 'reactstrap';
import { logout } from "../store/actions/authActions";

const Header = ({ location }) => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    let toggle = () => setIsOpen(!isOpen);

    const state = useSelector(state => state)
    let role = state.auth.role
    const handleLogout = () => {
        dispatch(logout())
    }
    return (

        <div className="container-fluid header-user">
            <Navbar light expand="md" className="row navbar-user">
                <Link className="logo-header" to={"/"}><img src="/logo.png" alt="" /> <h3>Listing Job</h3></Link>
                <NavbarToggler onClick={toggle} ></NavbarToggler>
                <Collapse isOpen={isOpen} navbar >
                    <Nav className="" navbar>
                        {role === "seekers" ? (
                            <NavItem>
                                <Link to={"/favourite"} className={location === 'favourite' ? "item-header-active" : "item-header"}>
                                    Favorite
                                </Link>
                            </NavItem>
                        ) : (
                            <NavItem>
                                <Link to={"/createeditjobs"} className={location === 'createeditjobs' ? "item-header-active" : "item-header"}>
                                    Create Job
                                </Link>
                            </NavItem>
                        )}
                        <NavItem >
                            <Link to={"/profile"} className={location === 'profile' ? "item-header-active" : "item-header"}>
                            Profile
                            </Link>
                        </NavItem>


                        <NavItem onClick={handleLogout} className="logout">
                            <Link to={"/login"}> Logout </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Header
