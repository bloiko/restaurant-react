import React, {useContext} from 'react';
import {MDBBtn, MDBCol, MDBRow} from "mdb-react-ui-kit";

export const CartFoodItem = ({foodItem, onRemove, onAdd}) => {
    const {image, price, name, quantity} = foodItem

    return (
        <MDBRow>
            <MDBCol lg='2' md='8' className='mb-4'>
                <img src={image} className='img-fluid rounded' alt='' />
            </MDBCol>
            <MDBCol lg='8' md='12' className='mb-4'>
                <div className='fw-bold'>{name}</div>
                <div className='text-muted'>price: {price}$</div>
                <div className='text-muted'>quantity: {quantity}</div>
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

