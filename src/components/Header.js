import React, {useContext, useState} from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBCollapse,
} from 'mdb-react-ui-kit';
import {Link, useNavigate} from "react-router-dom";
import {CartContext} from "../context/cartContext";
import {UserContext} from "../context/userContext";
import {authService} from "../services/authService";

export function Header() {
    const { cartItems } = useContext(CartContext)
    const {user} = useContext(UserContext)

    const [showBasic, setShowBasic] = useState(false);

    const navigate = useNavigate()

    const handleLogOut = () => {
        authService.removeToken()
        navigate("/")
    }

    return (
        <MDBNavbar expand='lg' light bgColor='light'>
            <MDBContainer fluid className="container">
                <MDBNavbarBrand><Link to="/"> Restaurant Bodyanych</Link></MDBNavbarBrand>

                <MDBNavbarToggler
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowBasic(!showBasic)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>

                <MDBCollapse navbar show={showBasic}>
                    <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
                        <MDBNavbarItem>
                            <MDBNavbarLink onClick={() => navigate('/menu')}>Menu</MDBNavbarLink>
                        </MDBNavbarItem>

                        {!!cartItems.length && <MDBNavbarItem>
                            <MDBNavbarLink onClick={() => navigate('/cart')}>Cart</MDBNavbarLink>
                        </MDBNavbarItem>}

                        {user && user.role === "ADMIN" ? <MDBNavbarItem>
                            <MDBNavbarLink onClick={() => navigate('/admin')}>Admin</MDBNavbarLink>
                        </MDBNavbarItem> : null }
                    </MDBNavbarNav>

                     <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 justify-content-end'>
                         {!user ?
                             <> <MDBNavbarItem>
                        <MDBNavbarLink onClick={() => navigate('/login')}>Sign in</MDBNavbarLink>
                    </MDBNavbarItem>

                    <MDBNavbarItem>
                        <MDBNavbarLink onClick={() => navigate('/register')}>Sign up</MDBNavbarLink>
                    </MDBNavbarItem>
                         </> : <MDBNavbarItem>
                             <MDBNavbarLink onClick={handleLogOut}>Log out</MDBNavbarLink>
                         </MDBNavbarItem>}
                    </MDBNavbarNav>

                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
