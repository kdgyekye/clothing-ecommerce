import React from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {toggleCart} from "../../store/actions/cart-actions";

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
        <CustomButton onClick={() => {props.history.push('/checkout');
            props.dispatch(toggleCart())
        }}>Go To Checkout</CustomButton>
    </div>
)

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown))