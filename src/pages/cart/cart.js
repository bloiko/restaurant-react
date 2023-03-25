import React, {useContext} from 'react';
import {Layout} from "../../components/Layout";
import {CartContext} from "../../context/cartContext";
import {MDBBtn} from "mdb-react-ui-kit";
import {http} from "../../services/apiService";
import {CartFoodItem} from "../../components/CartFoodItem";
import {useNavigate} from "react-router-dom";

export const Cart = () => {
    const { cartItems, removeFromCart, removeAllFromCart} = useContext(CartContext)
    const navigate = useNavigate()

    const handleSendCart = async () => {
        await http.post("/cart/order1", {foodItems: cartItems}).then(() => {
                navigate("/my-orders");
                removeAllFromCart()
            }
        )
    }

    return (
         <Layout>
             {cartItems.map((foodItem) => <CartFoodItem foodItem={foodItem} onRemove={() => removeFromCart(foodItem)} />)}
             <MDBBtn onClick={handleSendCart}>Order</MDBBtn>
         </Layout>
    );
};

