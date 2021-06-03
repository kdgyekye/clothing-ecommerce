import React from 'react';

import {connect} from "react-redux";
import {removeFromCart} from "../../store/actions/cart-actions";

import './cart-item.styles.scss';
import CustomButton from "../custom-button/custom-button.component";

const CartItem = ({ item, removeItem}) => {
    const { imageUrl, price, name, quantity} = item
    return (
        <div className='cart-item'>
            <img src={imageUrl} alt='item'/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
            </div>
            <div className='remove-item'>
                <button className='btn btn-danger' onClick={() => removeItem(item)}>Remove</button>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    removeItem: item => {
        dispatch(removeFromCart(item))
    }
})

export default connect(null, mapDispatchToProps)(CartItem);