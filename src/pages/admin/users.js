import React, {useEffect, useState} from 'react';
import {http} from "../../services/apiService";
import {Layout} from "../../components/Layout";
import {
    MDBBtn,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import {AuditModal} from "../../components/AuditModal";

export const AdminUsers = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [auditDtos, setAuditDtos] = useState([])

    const [isModalOpened, setIsModalOpened] = useState(false);


    useEffect(() => {
        http.get('/user/all').then(({data}) => {
            setUsers(data)
        })
    }, [])


    const handleOpenModal = (userId) => {
        setIsModalOpened(true)

        http.get('/audit/USER/' + userId).then((auditResponses) => {
            setAuditDtos(auditResponses.data)
        })
    }

    const removeUser = (userId) => {
        http.remove('/user/' + userId).then(({ data }) => {
            setUsers(data.length)
        })
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
                {users.map((user) => {
                    return (<tr onClick={() => handleOpenModal(user.id)}>
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

        <AuditModal isModalOpened={isModalOpened} openModal={setIsModalOpened} auditDtos={auditDtos} />
    </Layout>
}