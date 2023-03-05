import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardTitle} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export const Error404 = () => {
    const navigate = useNavigate()
    return (
            <MDBCard alignment='center' style={{padding: 200}}>
                <MDBCardBody>
                    <MDBCardTitle style={{paddingBottom: 20}}>404</MDBCardTitle>
                    <MDBCardTitle style={{paddingBottom: 20}}>This page might be not exist</MDBCardTitle>
                    <MDBBtn onClick={() => navigate("/")}>Go Back</MDBBtn>
                </MDBCardBody>
            </MDBCard>
    );
};

