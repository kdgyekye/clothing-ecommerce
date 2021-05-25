import React from 'react'
import {connect} from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.styles.scss'
import {selectCartItems} from "../../store/selectors/cart.selector";

const CartDropdown = (props) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {props.cartItems.map((item,index) => (
                <CartItem item={item} key={index} />
            ))}
        </div>

        <CustomButton>Go To Checkout</CustomButton>
    </div>
)

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDropdown)