import React from 'react'

//redux imports
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectItemsTotal} from "../../store/selectors/cart.selector";
import {clearAllFromCart, toggleCart} from "../../store/actions/cart-actions";

import './checkout.styles.scss'
import CheckoutItem from "../../components/checkout-items/checkout-item.component";
import StripePaymentButton from "../../components/stripe-payment/stripe-payment.button";

const Checkout = props => (
    <div className='checkout-page'>
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
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotal: selectItemsTotal
})

const mapDispatchToProps = dispatch => ({
    clearAll:  () => {
        dispatch(clearAllFromCart())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Checkout)