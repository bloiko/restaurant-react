import React, {useContext} from 'react';
import {Layout} from "../../components/Layout";
import {CartContext} from "../../context/cartContext";
import {FoodItem} from "../../components/FoodItem";
import {MDBBtn} from "mdb-react-ui-kit";
import {http} from "../../services/apiService";
import {CartFoodItem} from "../../components/CartFoodItem";

export const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext)
    const cartItemsWithQuantity = cartItems.map((item) =>({...item, quantity: 1}))

    const handleSendCart = async () => {
       await http.post("/cart/order1", {foodItems: cartItemsWithQuantity})
    }

    return (
         <Layout>
             {cartItems.map((foodItem) => <CartFoodItem foodItem={foodItem} onRemove={() => removeFromCart(foodItem)} />)}
             <MDBBtn onClick={handleSendCart}>Order</MDBBtn>
         </Layout>
    );
};

