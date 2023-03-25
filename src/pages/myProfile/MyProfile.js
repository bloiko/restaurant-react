import React, {useContext, useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon, MDBTooltip,
}
    from 'mdb-react-ui-kit';
import {http} from "../../services/apiService";
import {Layout} from "../../components/Layout";
import {useNavigate} from "react-router-dom";
import {NotificationContext} from "../../context/notifiactionContext";


export function MyProfile() {
    const {showNotification} = useContext(NotificationContext)
    const navigate = useNavigate()

    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")


    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordErrors, setNewPasswordErrors] = useState([])

    useEffect(() => {
        http.get("/user/profile").then(({data}) => {
            setId(data.id)
            setFirstName(data.firstName)
            setLastName(data.lastName)
            setUsername(data.username)
            setEmail(data.email)
            setAddress(data.address)
            setPhoneNumber(data.phoneNumber)
            console.log(data)
        })
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        console.log(id)
        http.put("/user/" + id, {email, username, firstName, lastName, address, phoneNumber})
            .then(() => {
                showNotification(`User is updated`, false)
            })
    }

    const handleUpdatePassword = (e) => {
        e.preventDefault()
        console.log(id)
        http.put("/user/" + id + "/password", {oldPassword, newPassword})
            .then(() => {
                showNotification(`Password is updated`, false)
            })
            .catch((res) => {
                console.log(res)
                const errors = res.errors[0].split("|")
                console.log(errors)
                setNewPasswordErrors(errors)
            })
    }

    return (
        <Layout>
            <MDBContainer fluid>
                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                    <MDBCardBody>
                        <MDBRow>
                            <MDBCol md='10' lg='6' className='order-1 order-lg-1 d-flex flex-column align-items-center'>

                                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Profile</p>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg'/>
                                    <MDBInput label='Your Email' id='form2' type='email' value={email}
                                              onChange={(e) => setEmail(e.target.value)}/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg'/>
                                    <MDBInput label='Your First Name' id='form11' type='text' className='w-100'
                                              value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg'/>
                                    <MDBInput label='Your Last Name' id='form1' type='text' className='w-100'
                                              value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg'/>
                                    <MDBInput label='Your User Name' id='form12' type='text' className='w-100'
                                              value={username} onChange={(e) => setUsername(e.target.value)}/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg'/>
                                    <MDBInput label='Your Address' id='form12' type='text' className='w-100'
                                              value={address} onChange={(e) => setAddress(e.target.value)}/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    <MDBIcon fas icon="user me-3" size='lg'/>
                                    <MDBInput label='Your Phone Number' id='form12' type='text' className='w-100'
                                              value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                </div>

                                <MDBBtn className='mb-4' size='lg' onClick={handleUpdate}>Update Details</MDBBtn>

                            </MDBCol>

                            <MDBCol md='10' lg='6' className='order-2 order-lg-2 d-flex flex-column align-items-center'>

                                <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Password</p>

                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MDBIcon fas icon="envelope me-3" size='lg'/>
                                    <MDBInput label='Old Password' id='form2' type='password' value={oldPassword}
                                              onChange={(e) => {
                                                  setOldPassword(e.target.value)
                                                  setNewPasswordErrors([])
                                              }
                                              }/>
                                </div>


                                <div className="d-flex flex-row align-items-center mb-4 ">

                                    <MDBIcon fas icon="user me-3" size='lg'/>
                                    <MDBInput label='New Password' id='form11' type='password' className='w-100'
                                              value={newPassword} onChange={(e) => {
                                        setNewPassword(e.target.value)
                                        setNewPasswordErrors([])
                                    }
                                    }/>
                                </div>

                                <div className="d-flex flex-row align-items-center mb-4 ">
                                    {newPasswordErrors.length ?
                                        <MDBTooltip wrapperProps={{color: 'danger'}} placement='right'
                                                    title={newPasswordErrors.map((error) => {
                                                        return (
                                                            <h6>{error}</h6>
                                                        )
                                                    })}>
                                            New Password is not valid >
                                        </MDBTooltip> :
                                        <MDBBtn className='mb-4' size='lg' onClick={handleUpdatePassword}>Update
                                            Password</MDBBtn>}
                                </div>


                            </MDBCol>

                        </MDBRow>
                    </MDBCardBody>
                </MDBCard>

            </MDBContainer>
        </Layout>
    );
}

