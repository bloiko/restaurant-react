import React, {useContext, useState} from 'react';
import {Layout} from "../../components/Layout";
import {CartContext} from "../../context/cartContext";
import {MDBBtn, MDBIcon, MDBInput} from "mdb-react-ui-kit";
import {http} from "../../services/apiService";
import {CartFoodItem} from "../../components/CartFoodItem";
import {useNavigate} from "react-router-dom";
import {NotificationContext} from "../../context/notifiactionContext";

export const Cart = () => {
    const {showNotification} = useContext(NotificationContext)
    const {cartItems, removeFromCart, removeAllFromCart} = useContext(CartContext)
    const [promoCode, setPromoCode] = useState("")
    const [discount, setDiscount] = useState("")

    const navigate = useNavigate()

    const handleSendCart = async () => {
        await http.post("/cart/order1", {foodItems: cartItems, promoCode: promoCode}).then(() => {
                navigate("/my-orders");
                removeAllFromCart()
            }
        )
    }

    const checkPromoCode = async () => {
        await http.get("/promocode/" + promoCode).then((res) => {
                setDiscount(res.data.discount)
                const existsPromoCode = res.data.exists
                showNotification(existsPromoCode ? "Promo code exists with discount " + res.data.discount + "%" : "Promo code doesn't exist", !existsPromoCode)
            }
        )
    }

    return (
        <Layout>
            {cartItems.map((foodItem) => <CartFoodItem foodItem={foodItem} onRemove={() => removeFromCart(foodItem)}/>)}

            <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput label='Your Promo Code' id='form2' value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}/>
                <MDBBtn  onClick={checkPromoCode}>Check promo code</MDBBtn>
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
            </div>

            <div className="d-flex flex-row align-items-center mb-4">
                <MDBBtn className='mb-4' size='lg' onClick={handleSendCart}>Order</MDBBtn>
            </div>
        </Layout>
    );
};

