import React, {useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
}
    from 'mdb-react-ui-kit';
import {http} from "../../services/apiService";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

export function Registration() {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        http.post("/security/signup", { email, password, username, firstName, lastName})
            .then(() => navigate("/login"))
    }


    return (
        <MDBContainer fluid>
            <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                            <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="envelope me-3" size='lg'/>
                                <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput label='Your First Name' id='form11' type='text' className='w-100' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput label='Your Last Name' id='form1' type='text' className='w-100' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                                <MDBIcon fas icon="lock me-3" size='lg'/>
                                <MDBInput label='Password' id='form3' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4 ">
                                <MDBIcon fas icon="user me-3" size='lg'/>
                                <MDBInput label='Your User Name' id='form12' type='text' className='w-100' value={username} onChange={(e) => setUsername(e.target.value)}/>
                            </div>

                            <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>

                        </MDBCol>

                        <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                        </MDBCol>

                    </MDBRow>
                </MDBCardBody>
            </MDBCard>

        </MDBContainer>
    );
}

