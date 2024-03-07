import React, { useContext, useEffect, useState } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import {
    Link,
    NavLink,
    useHistory,
    useLocation
} from 'react-router-dom';
import {
    UserContext
} from '../../context/UserContext'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.jpeg';
import * as authServices from '../../services/authServices';
import { toast } from 'react-toastify';
const Header = (props) => {
    const history = useHistory();
    const location = useLocation();
    const [ isShow, setIsShow ] = useState(true);
    const { user, logoutContext } = useContext(UserContext);
    const handleLogoutUser = async () => {
        const response = await authServices.handleLogout();
        if (response && +response.EC === 0) {
            localStorage.clear();
            toast.success('Log out successfully!');
            logoutContext();
            history.push('/')
        } else if (response && +response.EC === -1) {
            toast.error('Something wrongs...');
        }
    }
    useEffect(() => {
        const pathname = location.pathname;
        if (pathname === '/login' || pathname === '/register' || user && user.isAuthenticated === false) {
            setIsShow(false);
        }
    }, [location.pathname])
    return (
        <>
            {
                isShow || location.pathname === '/' || user.isAuthenticated === true ? 
                    <div className='header-container'>
                        <Navbar expand="lg" className="bg-header">
                            <Container>
                                <Navbar.Brand href="#home">
                                    <img
                                        alt=""
                                        src={logo}
                                        width="35"
                                        height="35"
                                        className="d-inline-block align-top"
                                    />{' '}
                                    <span className='brand-name'>Kiến Duy</span>
                                </Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <NavLink to="/" exact className="nav-link">Home</NavLink>
                                        <NavLink to="/users" className="nav-link">Users</NavLink>
                                        <NavLink to="/projects" className="nav-link">Projects</NavLink>
                                        <NavLink to="/roles" className="nav-link">Roles</NavLink>
                                        <NavLink to="/group-role" className="nav-link">Group Role</NavLink>
                                    </Nav>
                                    <Nav>
                                        {
                                            user && user.isAuthenticated ? 
                                                <>
                                                    <Nav.Item className="nav-link">
                                                        Welcome {user?.account?.username ? user.account.username : 'User'}!
                                                    </Nav.Item>
                                                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                        <NavDropdown.Item href="#action/3.1">Change password</NavDropdown.Item>
                                                        <NavDropdown.Divider />
                                                        <NavDropdown.Item onClick={() => handleLogoutUser()}>
                                                            Log out
                                                        </NavDropdown.Item>
                                                    </NavDropdown>
                                                </>
                                                :
                                                <>
                                                    <Link className="nav-link" to="/login">
                                                        Login
                                                    </Link>
                                                </>
                                        }
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
                    :
                    <></>
            }
        </>
    )
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Header);