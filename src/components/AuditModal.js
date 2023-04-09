import React, {useEffect, useState} from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody, MDBTable, MDBTableHead, MDBTableBody
} from 'mdb-react-ui-kit';


export const AuditModal = ({ auditDtos, openModal, isModalOpened }) => {
    return (
        <>
            <MDBModal show={isModalOpened} tabIndex='-1' setShow={openModal}>
                <MDBModalDialog size='lg'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>User audits</MDBModalTitle>

                            <MDBBtn className='btn-close' color='none' onClick={() => openModal(false)}></MDBBtn>
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
                                    {auditDtos.map((auditDto) => (<tr>
                                        <td>
                                            <div className='d-flex align-items-center'>
                                                <div className='ms-0'>
                                                    <p className='fw-bold mb-1'>{auditDto.userName.length ? auditDto.userName : '( ' + auditDto.userId + ' )'}</p>
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
                                    </tr>))
                                    }
                                </MDBTableBody>
                            </MDBTable>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </>
    );
}