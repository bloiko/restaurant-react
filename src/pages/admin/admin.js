import React, {useContext, useEffect, useState} from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import {Layout} from "../../components/Layout";
import {Buffer} from 'buffer';

import axios from "axios"
import {UserContext} from "../../context/userContext";
import {useNavigate} from "react-router-dom";

const url = "http://localhost:8083/report/orders/month"

const toBase64 = (response) =>
    `data:${response.headers["content-type"]};base64,${Buffer.from(response.data, "binary").toString(
        "base64"
    )}`

export const Admin = () => {
    const {user} = useContext(UserContext)

    const [file, setFile] = useState("")

    const navigate = useNavigate()

    const handleGetReport1 = async () => {
        axios.get(url, { responseType: 'arraybuffer' })
            .then(response => {
                setFile(toBase64(response))
            });
    }

   useEffect(() => {
       if(user && user.role !== "ADMIN") navigate("/")
    }, [user])

    return (
        <Layout>
            <MDBBtn onClick={handleGetReport1}>Month order report</MDBBtn>
            {file}
            <MDBBtn onClick={() => navigate("/admin/categories")}>Categories</MDBBtn>
            <MDBBtn onClick={() => navigate("/admin/users")}>Users</MDBBtn>
            <MDBBtn onClick={() => navigate("/admin/food-items")}>Food items</MDBBtn>
            <MDBBtn onClick={() => navigate("/admin/promocodes")}>Promo codes</MDBBtn>
        </Layout>
    );
};

