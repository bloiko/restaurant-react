import React, {useEffect, useState} from 'react';
import {Layout} from "../../components/Layout";
import {http} from "../../services/apiService";
import {MDBBtn, MDBCol, MDBRow} from "mdb-react-ui-kit";
import {OrdersTable} from "../../components/OrdersTable";

export const MyOrders = () => {
    return (
        <Layout>
            <OrdersTable />
        </Layout>
    );
};

