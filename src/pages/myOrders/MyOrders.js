import React from 'react';
import {Layout} from "../../components/Layout";
import {OrdersTable} from "../../components/OrdersTable";

export const MyOrders = () => {
    return (
        <Layout>
            <OrdersTable />
        </Layout>
    );
};

