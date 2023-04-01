import React, {useContext, useEffect, useState} from 'react';
import {http} from "../../services/apiService";
import {Layout} from "../../components/Layout";
import {
    MDBBtn,
    MDBInput,
    MDBModal, MDBModalBody,
    MDBModalContent,
    MDBModalDialog, MDBModalHeader, MDBModalTitle,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AuditModal, AuditModalContext} from "../../components/AuditModal";

export const AdminUsers = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [usersNum, setUsersNum] = useState(0)
    const [auditModalState, setAuditModalState] = useState(false)

    const [optSmModal, setOptSmModal] = useState(false);
    const [auditModalUserId, setAuditModalUserId] = useState('');
    const [auditDtos, setAuditDtos] = useState([])



    useEffect(() => {
        http.get('/user/all').then(({data}) => {
            setUsers(data)
            setUsersNum(data.length)
        })
    }, [usersNum])


    const toggleShow = (userId) => {
        setOptSmModal(true)
        setAuditModalUserId(userId)
        http.get('/audit/USER/' + userId).then((auditResponses)  =>{
            console.log(auditResponses.data)
            setAuditDtos(auditResponses.data)
        })
    }

    const removeUser = (userId) => {
        http.remove('/user/' + userId).then(()  =>{
            setUsersNum(usersNum - 1)
        })
    }

    const showAuditModal = (userId) => {
        console.log(userId)
        setAuditModalState(true)
    }
    return <Layout>
        <MDBBtn onClick={() => navigate("/admin")}>{"<"} Go back to Admin page</MDBBtn>
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>User Role</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Phone Number</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {users.length && users.map((user) => {
                    return (<tr onClick={() => toggleShow(user.id) }>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-a'>
                                    <p className='fw-bold mb-1'>{user.id}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{user.firstName}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{user.lastName}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{user.username}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{user.email}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{user.role}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{user.address}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{user.phoneNumber}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <MDBBtn color='danger' onClick={() => removeUser(user.id)}>Remove</MDBBtn>
                                </div>
                            </div>
                        </td>
                    </tr>)
                })
                }
            </MDBTableBody>
        </MDBTable>
        <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
            <MDBModalDialog size='lg'>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>User audits</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={() => setOptSmModal(false)}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <MDBTable align='middle'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>User Name</th>
                                    <th scope='col'>Action Type</th>
                                    <th scope='col'>Date</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                        {auditDtos.length && auditDtos.map((auditDto) => {
                            return (<tr>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='ms-0'>
                                            <p className='fw-bold mb-1'>{auditDto.userName.length? auditDto.userName : '( ' + auditDto.userId + ' )'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='ms-0'>
                                            <p className='fw-bold mb-1'>{auditDto.actionType}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='ms-0'>
                                            <p className='fw-bold mb-1'>{auditDto.auditDate}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>)
                        })
                        }
                            </MDBTableBody>
                        </MDBTable>
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </Layout>
}