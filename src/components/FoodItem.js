import React, {useContext} from 'react';
import {MDBBtn, MDBCol, MDBRow} from "mdb-react-ui-kit";
import {CartContext} from "../context/cartContext";

export const FoodItem = ({foodItem, onRemove, onAdd}) => {
    const {image, price, name, id} = foodItem
    const { addToCart } = useContext(CartContext)

    return (
        <MDBRow>
            <MDBCol lg='2' md='8' className='mb-4'>
                <img src={image} className='img-fluid rounded' alt='' />
            </MDBCol>
            <MDBCol lg='8' md='12' className='mb-4'>
                <div className='fw-bold'>{name}</div>
                <div className='text-muted'>{price}$</div>
            </MDBCol>
            <MDBCol lg='2' md='12' className='mb-4'>
                {onAdd ? <MDBBtn outline color='success' onClick={onAdd}>
                    Add to cart
                </MDBBtn>: null}
                {onRemove ? <MDBBtn outline color='warning' onClick={onRemove}>
                    Remove from cart
                </MDBBtn> : null}
            </MDBCol>
        </MDBRow>
    );
};

