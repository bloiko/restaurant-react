import React, {useEffect, useState} from 'react';
import {Layout} from "../../components/Layout";
import {http} from "../../services/apiService";

export const MyOrders = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        http.get("/myorders1", {Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjNRV0UhISEhYSIsInJvbGVzIjp7ImF1dGhvcml0eSI6IlVTRVIifSwiaWF0IjoxNjc3OTY0Nzg5LCJleHAiOjE2Nzc5NjcxODl9.pJjEo1REyky2xIwX7Du2pPmxRZNZsG4tdMgaDHQKhW0"}).then((res) => setOrders(res))
    },[])
    console.log(orders)
    return (
        <Layout>

        </Layout>
    );
};

