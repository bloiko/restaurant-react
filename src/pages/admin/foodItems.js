import React, {useEffect, useState} from 'react';
import {http} from "../../services/apiService";
import {Layout} from "../../components/Layout";
import {
    MDBBtn,
    MDBDropdown, MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBTable,
    MDBTableBody,
    MDBTableHead
} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import {AuditModal} from "../../components/AuditModal";

export const AdminFoodItems = () => {
    const [foodItems, setFoodItems] = useState([])
    const [foodItemsNum, setFoodItemsNum] = useState(0)

    const [categories, setCategories] = useState([])
    const [chosenCategory, setChosenCategory] = useState({id: 0, name: "All categories"})


    const [auditDtos, setAuditDtos] = useState([])

    const [isModalOpened, setIsModalOpened] = useState(false);

    const navigate = useNavigate()

    const removeFoodItem = (foodItemId) => {
        http.remove('/admin/food/item' + foodItemId).then(()  =>{
            setFoodItemsNum(foodItemsNum - 1)
        })
    }

    useEffect(() => {
        http.post('/menu1', {
            filterBy: chosenCategory.name,
            pageNumber: 1,
            pageSize: 1000,
            sortDirection: "ASC"
        }).then(({data}) => {
            setCategories(data.categories)
            setFoodItems(data.foodItems)
        })
    }, [chosenCategory.name])


    const handleOpenModal = (userId) => {
        setIsModalOpened(true)

        http.get('/audit/FOOD_ITEM/' + userId).then((auditResponses) => {
            setAuditDtos(auditResponses.data)
        })
    }

    return <Layout>
        <MDBDropdown>
            <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                {chosenCategory.name}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => setChosenCategory({id: 0, name: "All categories"})}>
                    All categories
                </MDBDropdownItem>
                {categories.map((category) =>
                    <MDBDropdownItem onClick={() => setChosenCategory(category)}>
                        {category.name}
                    </MDBDropdownItem>)}
            </MDBDropdownMenu>
        </MDBDropdown>
        <MDBBtn onClick={() => navigate("/admin")}>{"<"} Go back to Admin page</MDBBtn>
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Image</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Category</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {foodItems.length && foodItems.map((foodItem) => {
                    return (<tr onClick={() => handleOpenModal(foodItem.id)}>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-a'>
                                    <p className='fw-bold mb-1'>{foodItem.id}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='mb-sm-6'>
                                    <img src={foodItem.image} className='img-fluid rounded' alt='' />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{foodItem.name}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{foodItem.price}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className='d-flex align-items-center'>
                                <div className='ms-0'>
                                    <p className='fw-bold mb-1'>{foodItem.category.name}</p>
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
        <AuditModal isModalOpened={isModalOpened} openModal={setIsModalOpened} auditDtos={auditDtos} />
    </Layout>
}