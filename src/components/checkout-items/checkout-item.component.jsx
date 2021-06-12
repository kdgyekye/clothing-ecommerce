import React from 'react'

import {ReactComponent as Logo} from "../../assets/026-delete.svg";

import './checkout-item.styles.scss'

//redux imports
import {connect} from "react-redux";
import {removeFromCart, reduceQuantity, addItem} from "../../store/actions/cart-actions";

const CheckoutItem = ({cartItem,removeItem,reduceItemQuantity,increaseItemQuantity}) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={cartItem.imageUrl} alt='cart item'/>
        </div>
        <span className='name'>{cartItem.name}</span>
        <span className='quantity'>
            <div className='arrow fas fa-minus' onClick={() => reduceItemQuantity(cartItem)}/>
            <span className='value'>{cartItem.quantity}</span>
            <div className='arrow fa fa-plus' onClick={() => increaseItemQuantity(cartItem)}/>
        </span>
        <span className='price'>{`$${cartItem.price*cartItem.quantity}`}</span>
        <div className='remove-button'><Logo className='navbar-toggler-icon' onClick={() => removeItem(cartItem)}/></div>
    </div>
)

const mapDispatchToProps = dispatch => ({
        removeItem: item => dispatch(removeFromCart(item)),
        reduceItemQuantity: item => dispatch(reduceQuantity(item)),
        increaseItemQuantity: item => dispatch(addItem(item))

    }
)

export default connect(null, mapDispatchToProps)(CheckoutItem)