import React, {useContext, useEffect, useState} from 'react';
import {http} from "../../services/apiService";
import {Layout} from "../../components/Layout";
import {MDBBtn, MDBInput, MDBTable, MDBTableBody, MDBTableHead} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AdminCategories = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [categoriesNum, setCategoriesNum] = useState(0)

    const [categoryNameToAdd, setCategoryNameToAdd] = useState([])

    useEffect(() => {
        http.get('/admin/categories').then(({data}) => {
            setCategories(data)
            setCategoriesNum(data.length)
        })
    }, [categoriesNum])

    const removeCategory = (categoryId) => {
        http.remove('/admin/category/' + categoryId).then(()  =>{
            setCategoriesNum(categoriesNum - 1)

        })
    }

    const addCategory = (categoryName) => {
        http.post('/admin/category', {name : categoryNameToAdd}).then(()  =>{
           setCategoriesNum(categoriesNum + 1)
        })
    }
    return <Layout>
        <MDBBtn onClick={() => navigate("/admin")}>{"<"} Go back to Admin page</MDBBtn>
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Order Name</th>
                    <th scope='col'>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {categories.length && categories.map((category) => {
                    return (<tr>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <p className='fw-bold mb-1'>{category.name}</p>
                                </div>
                            </div>
                        </td>

                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-3'>
                                    <MDBBtn color='danger' onClick={() => removeCategory(category.id)}>Remove category with all items</MDBBtn>
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
                                <MDBInput label='' id='form12' type='text' className='w-100' value={categoryNameToAdd}
                                          onChange={(e) => setCategoryNameToAdd(e.target.value)} autoComplete="off"/>
                            </div>
                        </div>
                    </td>

                    <td>
                        <div className='d-flex align-items-center'>
                            <div className='ms-3'>
                                <MDBBtn onClick={() => addCategory(categoryNameToAdd)}>Add category</MDBBtn>
                            </div>
                        </div>
                    </td>
                </tr>
            </MDBTableBody>
        </MDBTable>
    </Layout>
}