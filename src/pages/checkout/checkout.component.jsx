import React from 'react'

//redux imports
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectItemsTotal} from "../../store/selectors/cart.selector";
import './checkout.styles.scss'

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
        <div>
            {
                props.cartItems.map(cartItem => cartItem.name)
            }
        </div>
        <div className='total'>Total: {`$${props.cartItemsTotal}`}</div>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartItemsTotal: selectItemsTotal
})

export default connect(mapStateToProps)(Checkout)