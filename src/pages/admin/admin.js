import React, { useState} from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import {Layout} from "../../components/Layout";
import {Buffer} from 'buffer';

import axios from "axios"

const url = "http://localhost:8083/report/orders/month"

const toBase64 = (response) =>
    `data:${response.headers["content-type"]};base64,${Buffer.from(response.data, "binary").toString(
        "base64"
    )}`

export const Admin = () => {
    const [file, setFile] = useState("")

    const handleGetReport1 = async () => {
        axios.get(url, { responseType: 'arraybuffer' })
            .then(response => {
                setFile(toBase64(response))
                console.log(toBase64(response))
            });
    }

    return (
        <Layout>
            <MDBBtn onClick={handleGetReport1}>Button</MDBBtn>
            {file}
        </Layout>
    );
};

