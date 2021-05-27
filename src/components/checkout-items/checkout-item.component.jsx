import React from 'react'

import {ReactComponent as Logo} from "../../assets/026-delete.svg";

import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={cartItem.imageUrl} alt='cart item'/>
        </div>
        <span className='name'>{cartItem.name}</span>
        <span className='quantity'>{cartItem.quantity}</span>
        <span className='price'>{cartItem.price}</span>
        <div className='remove-button'><Logo className='navbar-toggler-icon'/></div>
    </div>
)

export default CheckoutItem