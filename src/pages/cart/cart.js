import React, {useContext} from 'react';
import {Layout} from "../../components/Layout";
import {CartContext} from "../../context/cartContext";
import {FoodItem} from "../../components/FoodItem";

export const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext)

    return (
         <Layout>
             {cartItems.map((foodItem) => <FoodItem foodItem={foodItem} onRemove={() => removeFromCart(foodItem)} />)}
         </Layout>
    );
};

