import React from 'react'

import {ReactComponent as Logo} from "../../assets/026-delete.svg";

import './checkout-item.styles.scss'

//redux imports
import {connect} from "react-redux";
import {removeFromCart} from "../../store/actions/cart-actions";

const CheckoutItem = ({cartItem,removeItem}) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={cartItem.imageUrl} alt='cart item'/>
        </div>
        <span className='name'>{cartItem.name}</span>
        <span className='quantity'>{cartItem.quantity}</span>
        <span className='price'>{cartItem.price}</span>
        <div className='remove-button'><Logo className='navbar-toggler-icon' onClick={() => removeItem(cartItem)}/></div>
    </div>
)

const mapDispatchToProps = dispatch => ({
        removeItem: item => dispatch(removeFromCart(item))
    }
)

export default connect(null, mapDispatchToProps)(CheckoutItem)