import React, {useState} from "react";

import CustomButton from "../custom-button/custom-button.component";
import ItemDetails from "../item-details/item-details.component";

//redux imports
import {connect} from "react-redux";
import {addItem} from "../../store/actions/cart-actions";

//import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

import './collection-item.styles.scss'
import 'fontawesome'
import {toggleItemAddedAlert} from "../../store/actions/collection.actions";

const CollectionItem = ({item,addToCart, alertToggle}) => {
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

    return (
        <div>
            <div className='collection-item'>
                <div
                    className='image'
                    style={{backgroundImage: `url(${imageUrl})`}}
                />
                <div className='collection-footer' >
                    <div className='name'>{name}</div>
                    <div className='price'>{price}</div>
                </div>
                <div className='product-actions'>
                    <button className='view' data-toggle="modal" data-target="#itemDetailsModal" onClick={toggle}>View</button>
                    <CustomButton onClick={() => {
                        addToCart(item)
                        alertToggle(true)
                    }} inverted>Add to Cart</CustomButton>
                </div>
            </div>
            <ItemDetails item={item} />
            {/*<Modal isOpen={modal} toggle={toggle} className='item-modal'>*/}
            {/*    <div className='item-details'>*/}
            {/*    <ModalHeader toggle={toggle}>{name}</ModalHeader>*/}
            {/*    <ModalBody>*/}
            {/*        <div className='row'>*/}
            {/*            <div className='col-md-6'>*/}
            {/*                <img src={`${imageUrl}`} style={{width: '100%', height: '80%'}} />*/}
            {/*            </div>*/}
            {/*            <div className='col-md-6'>*/}
            {/*                <div className='row'>*/}
            {/*                    <div className='col text-wrap'>*/}
            {/*                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className='row'>*/}
            {/*                    <div className='modal-quantity'>*/}
            {/*                        <div>*/}
            {/*                            Quantity:*/}
            {/*                        </div>*/}
            {/*                        <div>*/}
            {/*                            <i className='modal-arrow fas fa-minus' onClick={() => reduceCount(count)}/>*/}
            {/*                            <span className='modal-value' id='count'>{count}</span>*/}
            {/*                            <i className="modal-arrow fas fa-plus" onClick={() => setCount(count+1)}/>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className='row'>*/}
            {/*                    <div className='col add-to-cart' style={{marginTop: '30px'}}>*/}
            {/*                        <CustomButton onClick={() => {*/}
            {/*                            addToCartWithQuantity({...item, quantity: count})*/}
            {/*                            alertToggle(true)*/}
            {/*                        }} id='add-button'>Add to Cart</CustomButton>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </ModalBody>*/}
            {/*    <ModalFooter>*/}
            {/*        <CustomButton onClick={toggle} inverted>Close</CustomButton>*/}
            {/*    </ModalFooter>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </div>
        )
}

const mapDispatchToProps = dispatch => ({
    addToCart: item => {
        dispatch(addItem(item))
    },
    alertToggle: (alertState) => dispatch(toggleItemAddedAlert(alertState)),
    })

export default connect(null,mapDispatchToProps)(CollectionItem);
