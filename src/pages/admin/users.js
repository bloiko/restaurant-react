import React, {useContext, useEffect, useState} from 'react';
import {http} from "../../services/apiService";
import {Layout} from "../../components/Layout";
import {MDBBtn, MDBInput, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AdminUsers = () => {
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [usersNum, setUsersNum] = useState(0)

    useEffect(() => {
        http.get('/user/all').then(({data}) => {
            setUsers(data)
            setUsersNum(data.length)
        })
    }, [usersNum])

    const removeUser = (userId) => {
        http.remove('/user/' + userId).then(()  =>{
            setUsersNum(usersNum - 1)
        })
    }

    // const addCategory = (categoryName) => {
    //     http.post('/admin/category', {name : categoryNameToAdd}).then(()  =>{
    //         setUsersNum(usersNum + 1)
    //     })
    // }
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
                    return (<tr>
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
                {/*<tr>*/}
                {/*    <td>*/}
                {/*        <div className='d-flex align-items-center'>*/}
                {/*            <div className='ms-3'>*/}
                {/*                <MDBInput label='' id='form12' type='text' className='w-100' value={categoryNameToAdd}*/}
                {/*                          onChange={(e) => setCategoryNameToAdd(e.target.value)} autoComplete="off"/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </td>*/}

                {/*    <td>*/}
                {/*        <div className='d-flex align-items-center'>*/}
                {/*            <div className='ms-3'>*/}
                {/*                <MDBBtn onClick={() => addCategory(categoryNameToAdd)}>Add category</MDBBtn>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </td>*/}
                {/*</tr>*/}
            </MDBTableBody>
        </MDBTable>
    </Layout>
}