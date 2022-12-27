import React, { useState } from 'react';
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

export function Header() {
    const [showBasic, setShowBasic] = useState(false);
    const navigate = useNavigate()
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
                        <MDBNavbarItem>
                            <MDBNavbarLink onClick={() => navigate('/cart')}>Cart</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                    <MDBBtn onClick={() => navigate('/login')} color='primary' className="w-25">Sign in</MDBBtn>
                    <MDBBtn onClick={() => navigate('/register')} color='secondary' className="w-25">Sign up</MDBBtn>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
}
