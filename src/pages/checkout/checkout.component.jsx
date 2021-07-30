import React, {useEffect} from 'react'

//redux imports
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectItemsTotal} from "../../store/selectors/cart.selector";
import {clearAllFromCart} from "../../store/actions/cart-actions";

import './checkout.styles.scss'
import CheckoutItem from "../../components/checkout-items/checkout-item.component";
import StripePaymentButton from "../../components/stripe-payment/stripe-payment.button";
import {Alert} from "reactstrap";
import {selectItemAddedAlert} from "../../store/selectors/collection.selector";
import {toggleItemAddedAlert} from "../../store/actions/collection.actions";

const Checkout = props => {
    const toggleVisibility = () => props.alertToggle(false)

    const timeOutAlert = () => {
        if (props.alertState) {
            setTimeout(() => {
                props.alertToggle(false)
            }, 2000)
        }
    }

    useEffect( () => {
        timeOutAlert()
    })

    return (
        <div className='checkout-page'>
            <div className='page-title'><h2>Order Summary</h2></div>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
            {
                props.cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            }
            <div className='footer'>
                <span className='clear-cart'>
                    <button className='btn btn-outline-danger' onClick={props.clearAll}>Clear Cart</button>
                </span>
                <span className='total'>Total: {`$${props.cartItemsTotal}`}</span>
            </div>
            <StripePaymentButton price={props.cartItemsTotal}/>
            <div className='item-alert fixed-bottom'>
                <Alert isOpen={props.alertState} toggle={toggleVisibility}
                       style={{backgroundColor: '#45dc38', color: 'black', border: 'none'}}
                >Item has been removed from cart</Alert>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotal: selectItemsTotal,
    alertState: selectItemAddedAlert
})

const mapDispatchToProps = dispatch => ({
    clearAll:  () => {
        dispatch(clearAllFromCart())
    },
    alertToggle: (alertState) => dispatch(toggleItemAddedAlert(alertState))
})

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)