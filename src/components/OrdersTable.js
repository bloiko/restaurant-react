import React, {useEffect, useState} from 'react';
import {MDBBadge, MDBTable, MDBTableHead, MDBTableBody, MDBListGroup, MDBListGroupItem} from 'mdb-react-ui-kit';
import {http} from "../services/apiService";
import moment from 'moment'

const getStatusTheme = (status) => {
    switch (status) {
        case "WAITING":
            return "warning"
        case "PREPARING":
            return "primary"
        case "READY":
            return "info"
        case "DELIVERED":
            return "success"
        case "DONE":
            return "success"
        default :
            return "warning"
    }
}

export const OrdersTable = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        http.get("/myorders1").then((res) => setOrders(res.data.myOrders))
    },[])


    return (
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Order №</th>
                    <th scope='col'>Сomponents</th>
                    <th scope='col'>Total Price</th>
                    <th scope='col'>Discount</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Date</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {orders.length && orders.map((order) => {

                    return (<tr style={order.orderStatus != "DONE" ? { backgroundColor: 'lightyellow' } : null}>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>{order.id}</p>
                                </div>
                            </div>
                        </td>

                        <td>
                            { order.foodItems.map(({name, price, quantity}) => <MDBListGroup light>
                                <MDBListGroupItem style={{padding: 5}} className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <div className='fw-bold'>{name}</div>
                                        <div className='text-muted'>quantity: {quantity}</div>
                                    </div>
                                    <MDBBadge pill light color='primary'>
                                        {price}$
                                    </MDBBadge>
                                </MDBListGroupItem>
                            </MDBListGroup>)}
                        </td>

                        <td>
                            <MDBBadge color='primary'>
                                {order.orderPrice}$
                            </MDBBadge>
                        </td>

                        <td>
                            <MDBBadge color='primary'>
                                {order.promoCodeDiscount}%
                            </MDBBadge>
                        </td>

                        <td>
                            <MDBBadge color={getStatusTheme(order.orderStatus)}>
                                {order.orderStatus}
                            </MDBBadge>
                        </td>
                        <td>
                            <MDBBadge color='primary'>
                                {moment( order.orderDate).format("DD-MM-YYYY  hh:mm:ss")}
                            </MDBBadge>
                        </td>
                    </tr>)
                })
            }
            </MDBTableBody>
        </MDBTable>
    );
}
