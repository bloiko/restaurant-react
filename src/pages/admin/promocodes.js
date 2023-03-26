import React, {useContext, useEffect, useState} from 'react';
import {http} from "../../services/apiService";
import {Layout} from "../../components/Layout";
import {MDBBtn, MDBInput, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";

export const AdminPromoCodes = () => {
    const navigate = useNavigate()

    const [promoCodes, setPromoCodes] = useState([])
    const [promoCodesNum, setPromoCodesNum] = useState([])

    const [codeToAdd, setCodeToAdd] = useState([])
    const [discountToAdd, setDiscountToAdd] = useState([])

    useEffect(() => {
        http.get('/promocode/all').then(({data}) => {
            setPromoCodes(data)
        })
    }, [promoCodesNum])

    const deactivatePromoCode = (categoryId) => {
        http.put(`/promocode/deactivate/${categoryId}`).then(() => {
            http.get('/promocode/all').then(({data}) => {
                setPromoCodes(data)
            })
        })
    }

    const activatePromoCode = (categoryId) => {
        http.put('/promocode/activate/' + categoryId).then(() => {
            http.get('/promocode/all').then(({data}) => {
                setPromoCodes(data)
            })
        })
    }

    const addPromoCode = (code, discount) => {
        http.post('/promocode', {code: code, discount: discount}).then(() => {
            setPromoCodesNum(promoCodesNum + 1)
        })
    }

    return <Layout>
        <MDBBtn onClick={() => navigate("/admin")}>{"<"} Go back to Admin page</MDBBtn>
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Promo Code</th>
                    <th scope='col'>Discount %</th>
                    <th scope='col'>Is active</th>
                    <th scope='col'>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {promoCodes.length && promoCodes.map((promoCode) => {
                    return (<tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>{promoCode.code}</p>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>{promoCode.discount}</p>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>{promoCode.active ? "Active" : "Inactive"}</p>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    {promoCode.active ?
                                        <MDBBtn color='danger' onClick={() => deactivatePromoCode(promoCode.code)}>Deactivate
                                            promo code</MDBBtn>
                                        : <MDBBtn color='success' onClick={() => activatePromoCode(promoCode.code)}>Activate
                                            promo code</MDBBtn>}
                                </div>
                            </div>
                        </td>
                    </tr>)
                })
                }
                <tr>
                    <td>
                        <div className='d-flex align-items-center'>
                            <div className='ms-3'>
                                <MDBInput label='' id='form12' type='text' className='w-100' value={codeToAdd}
                                          onChange={(e) => setCodeToAdd(e.target.value)} autoComplete="off"/>
                            </div>
                        </div>
                    </td>

                    <td>
                        <div className='d-flex align-items-center'>
                            <div className='ms-3'>
                                <MDBInput label='' id='form12' type='text' className='w-100' value={discountToAdd}
                                          onChange={(e) => setDiscountToAdd(e.target.value)} autoComplete="off"/>
                            </div>
                        </div>
                    </td>

                    <td>
                        <div className='d-flex align-items-center'>
                            <div className='ms-3'>
                            </div>
                        </div>
                    </td>

                    <td>
                        <div className='d-flex align-items-center'>
                            <div className='ms-3'>
                                <MDBBtn onClick={() => addPromoCode(codeToAdd, discountToAdd)}>Add promo code</MDBBtn>
                            </div>
                        </div>
                    </td>
                </tr>
            </MDBTableBody>
        </MDBTable>
    </Layout>
}