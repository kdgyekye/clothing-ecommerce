import React from 'react'

import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";

import './cart-icon.styles.scss'

//redux imports
import {toggleCart} from "../../store/actions/cart-actions";
import {connect} from "react-redux";
import {selectCartItemsQuantity} from "../../store/selectors/cart.selector";
import {selectItemAddedAlert} from "../../store/selectors/collection.selector";

const CartIcon = (props) => {
    const addGlowingClass = () => {
        if (props.alertState) {
            const quantityIndicator = document.getElementById('quantity')
            quantityIndicator?.classList.add('item-added-glow')
            setTimeout( () => document.getElementById('quantity').classList.remove('item-added-glow') ,1000)
        }
    }
    addGlowingClass()
    return (
        <div className='cart-icon' onClick={props.toggleCart}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count' id='quantity'>{props.itemsQuantity}</span>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        itemsQuantity: selectCartItemsQuantity(state),
        updatedQuantity: state.cartReducer.quantityUpdated,
        alertState: selectItemAddedAlert(state)
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