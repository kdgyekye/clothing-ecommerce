import React, {useEffect, useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CustomButton from "../custom-button/custom-button.component";
import {connect} from "react-redux";
import {addItem, addItemWithQuantity, reduceQuantity} from "../../store/actions/cart-actions";
import {toggleItemAddedAlert} from "../../store/actions/collection.actions";

const ItemDetails = ({item, addToCartWithQuantity, alertToggle}) => {
    const {name,price,imageUrl,quantity} = item

    const [modal, setModal] = useState(false);
    const [count, setCount] = useState(0)

    const toggle = () => setModal(!modal);

    const reduceCount = (count) => {
        if (count === 0) {
            return
        }
        return setCount(count - 1)
    }

    const disableButton = () => {
        const addButton = document.getElementById('add-button');
        console.log(addButton)
        console.log(!!addButton)
        if (!!addButton) {
            if (count === 0) {
                addButton.disabled = true
            }
            addButton.disabled = false
        }
        return null
    }

    useEffect( () => {
        disableButton()
    },[])

    return (
        <Modal isOpen={true} toggle={toggle} className='item-modal'>
            <div className='item-details'>
                <ModalHeader toggle={toggle}>{name}</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={`${imageUrl}`} style={{width: '100%', height: '80%'}} />
                            <div><em><strong>Price: {`$${price}`}</strong></em></div>
                        </div>
                        <div className='col-md-6'>
                            <div className='row'>
                                <div className='col text-wrap'>
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                </div>
                            </div>
                            <div className='row'>
                                <div className='modal-quantity'>
                                    <div>
                                        Quantity:
                                    </div>
                                    <div>
                                        <i className='modal-arrow fas fa-minus' onClick={() => reduceCount(count)}/>
                                        <span className='modal-value' id='count'>{count}</span>
                                        <i className="modal-arrow fas fa-plus" onClick={() => setCount(count+1)}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col add-to-cart' style={{marginTop: '30px'}}>
                                    <CustomButton onClick={() => {
                                        addToCartWithQuantity({...item, quantity: count})
                                        alertToggle(true)
                                    }} id='add-button'>Add to Cart</CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <CustomButton onClick={toggle} inverted>Close</CustomButton>
                </ModalFooter>
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


export default connect(null, mapDispatchToProps())(ItemDetails);