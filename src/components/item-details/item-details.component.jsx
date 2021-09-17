import React, {useEffect, useState} from 'react';
import {Modal} from 'reactstrap';
import {connect} from "react-redux";
import { addItemWithQuantity} from "../../store/actions/cart-actions";
import {toggleItemAddedAlert} from "../../store/actions/collection.actions";

import './item-details.styles.scss'

const ItemDetails = ({item, addToCartWithQuantity, alertToggle,modal,setModal}) => {
    const {name,price,imageUrl} = item

    const [count, setCount] = useState(0)

    const toggle = () => setModal(!modal);

    const reduceCount = (count) => {
        if (count === 0) {
            return
        }
        return setCount(count - 1)
    }

    const buttonEnabled = count > 0
    console.log(buttonEnabled)
    return (
        <Modal isOpen={modal} toggle={toggle} className='item-modal'>
            <div className='product-card'>
                <div className='product-modal-header'>
                    <div className='rating'>
                        <i className='fa fa-star' aria-hidden='true' />
                        <i className='fa fa-star' aria-hidden='true' />
                        <i className='fa fa-star' aria-hidden='true' />
                        <i className='fa fa-star' aria-hidden='true' />
                        <i className='fa fa-star-half' aria-hidden='true' />
                    </div>
                    <div>
                        <button className='btn-close' onClick={toggle}/>
                    </div>
                </div>
                <div className='product-card-header'>
                    <img src={`${imageUrl}`}  alt='Product'/>
                </div>
                <div className='product-card-body'>
                    <div className='product-title'>{name}</div>
                    <div className='description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                    <div className='product-credentials'>
                        <div className='product-price'><span className='price-title'>Price: </span>{`$${price}`}</div>
                        <div className='modal-quantity'>
                            <div className='quantity-title'>Quantity: </div>
                            <div>
                                <i className='modal-arrow fas fa-minus' onClick={() => reduceCount(count)}/>
                                <span className='modal-value' id='count'>{count}</span>
                                <i className="modal-arrow fas fa-plus" onClick={() => setCount(count+1)}/>
                            </div>
                        </div>
                    </div>
                    <div className='product-card-footer'>
                        <button className='btns buy'>Buy Now</button>
                        <button className='btns add' id='add-button' disabled={!buttonEnabled} onClick={() =>
                        {addToCartWithQuantity({...item, quantity: count})
                            alertToggle(true)
                            }}>Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

const mapDispatchToProps = dispatch => ({
    addToCartWithQuantity: item => {
        dispatch(addItemWithQuantity(item))
    },
    alertToggle: (alertState) => dispatch(toggleItemAddedAlert(alertState)),
})


export default connect(null, mapDispatchToProps)(ItemDetails);