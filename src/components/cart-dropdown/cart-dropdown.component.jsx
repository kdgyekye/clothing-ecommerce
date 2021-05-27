import React from 'react'
import {connect} from "react-redux";
import {withRouter, Link} from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.styles.scss'
import {selectCartItems} from "../../store/selectors/cart.selector";

const CartDropdown = (props) => (
    <div className='cart-dropdown'>
        <div className='cart-items '>
            {
                props.cartItems.length ?
                    props.cartItems.map((item,index) => (
                        <CartItem item={item} key={index} />
                    ))
                    :
                    <span className='empty-message'>You have no items in the cart</span>
            }
        </div>

        <CustomButton onCLick={() => props.history.push('/checkout')}>Go To Checkout</CustomButton>
    </div>
)

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown))