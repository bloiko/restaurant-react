import React, {useContext, useEffect, useState} from 'react';
import {Layout} from "../../components/Layout";
import {http} from "../../services/apiService";
import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBListGroup,
    MDBPagination,
    MDBPaginationItem,
    MDBPaginationLink
} from "mdb-react-ui-kit";
import {FoodItem} from "../../components/FoodItem";
import {CartContext} from "../../context/cartContext";
import {NotificationContext} from "../../context/notifiactionContext";


export const Main = () => {
    const {showNotification} = useContext(NotificationContext)
    const {addToCart} = useContext(CartContext)

    const [categories, setCategories] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [chosenCategory, setChosenCategory] = useState({id: 0, name: "All categories"})

    const [pageNumber, setPageNumber] = useState(1)
    const [numOfPages, setNumOfPages] = useState([])

    useEffect(() => {
        http.post('/menu1', {
            filterBy: chosenCategory.name, pageNumber: 1, pageSize: 3, sortDirection: "ASC"
        }).then(({data}) => {
            setCategories(data.categories)
            setFoodItems(data.foodItems)
            setNumOfPages(data.numOfPages)
        })

    }, [chosenCategory.name])

    useEffect(() => {
        http.post('/menu1', {
            filterBy: chosenCategory.name, pageNumber: pageNumber, pageSize: 3, sortDirection: "ASC"
        }).then(({data}) => {
            setCategories(data.categories)
            setFoodItems(data.foodItems)
            setNumOfPages(data.numOfPages)

            showNotification(`${chosenCategory.name} have been selected`)
        })
    }, [pageNumber])

    const paginationItems = Array.from({length: numOfPages}, (_, i) => i + 1).map(i =>
        (<MDBPaginationItem key={i}>
            <MDBPaginationLink onClick={() => setPageNumber(i)}>{i}</MDBPaginationLink>
        </MDBPaginationItem>))

    return (<Layout>
        <MDBDropdown>
            <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                {chosenCategory.name}
            </MDBDropdownToggle>

            <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => setChosenCategory({id: 0, name: "All categories"})}>
                    All categories
                </MDBDropdownItem>

                {categories.map((category) => <MDBDropdownItem onClick={() => setChosenCategory(category)}>
                    {category.name}
                </MDBDropdownItem>)}
            </MDBDropdownMenu>
        </MDBDropdown>

        <MDBListGroup style={{minWidth: '22rem'}} light>
            {foodItems.map((item) => <FoodItem key={item.id} foodItem={item} onAdd={() => addToCart(item)}/>)}
        </MDBListGroup>

        <nav className="d-flex justify-content-center" aria-label='...'>
            <MDBPagination size='lg' className='mb-0'>
                {paginationItems}
            </MDBPagination>
        </nav>
    </Layout>);
};

