import React, {useContext, useEffect, useState} from 'react';
import {Layout} from "../../components/Layout";
import {http} from "../../services/apiService";
import {MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBListGroup} from "mdb-react-ui-kit";
import {FoodItem} from "../../components/FoodItem";
import {CartContext} from "../../context/cartContext";


export const Main = () => {
    const [categories, setCategories] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [chosenCategory, setChosenCategory] = useState({id:0, name: "Categories" })

    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        http.post('/menu1', { filterBy: chosenCategory.name,
            pageNumber: 1,
            pageSize: 10,
            sortDirection: "ASC"}).then(({data}) => {
                setCategories(data.categories)
                setFoodItems(data.foodItems)
            })
    },[chosenCategory.name])

    return (
        <Layout>
            <MDBDropdown onValueChange={console.log}>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                    {chosenCategory.name}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    {categories.map((category) =>
                        <MDBDropdownItem onClick={() => setChosenCategory(category)}>
                            {category.name}
                        </MDBDropdownItem>)}
                </MDBDropdownMenu>
            </MDBDropdown>
            <MDBListGroup style={{ minWidth: '22rem' }} light>
            {foodItems.map((item) => <FoodItem foodItem={item} onAdd={() => addToCart(item)} />)}
            </MDBListGroup>
        </Layout>
    );
};

