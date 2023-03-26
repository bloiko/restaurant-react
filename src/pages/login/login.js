import React, {useContext, useState} from 'react';
import {http} from "../../services/apiService";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import {authService} from "../../services/authService";
import {useAuth} from "../../hooks/useAuth";
import {UserContext} from "../../context/userContext";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const { getUser } = useContext(UserContext)


    useAuth("/")

    const handleSubmit = (e) => {
        e.preventDefault()
        http.post("/security/signin", {username, password}).then(({data}) => {
            if (data.authToken) {
                authService.setToken(data.authToken)
                getUser()
                navigate("/")
            }
        })
    }

    return (
        <MDBContainer fluid >
            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput label='User Name' id='form12' type='text' className='w-100' value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off"/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg'/>
                                <MDBInput label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Sign In</MDBBtn>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
};

