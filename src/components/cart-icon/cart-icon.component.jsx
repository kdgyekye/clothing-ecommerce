import React from 'react'

import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";

import './cart-icon.styles.scss'

//redux imports
import {toggleCart} from "../../store/actions/cart-actions";
import {connect} from "react-redux";
import {selectCartItemsQuantity} from "../../store/selectors/cart.selector";

const CartIcon = (props) => (
    <div className='cart-icon' onClick={props.toggleCart}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{props.itemsQuantity}</span>
    </div>
)
const mapStateToProps = state => {
    return {
        itemsQuantity: selectCartItemsQuantity(state)
    }
}
const mapDispatchToProps = dispatch => ({
    toggleCart:  () => {
        dispatch(toggleCart())
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon)