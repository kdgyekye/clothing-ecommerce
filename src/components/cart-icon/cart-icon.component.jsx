import React from 'react'

import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";

import './cart-icon.styles.scss'

//redux imports
import {toggleCart} from "../../store/actions/cart-actions";
import {connect} from "react-redux";

const CartIcon = (props) => (
    <div className='cart-icon' onClick={props.toggleCart}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>0</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCart:  () => {
        dispatch(toggleCart())
    }
})
export default connect(
    null,
    mapDispatchToProps
)(CartIcon)