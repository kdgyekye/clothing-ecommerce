import React, {useState} from "react";

import './collection-item.styles.scss'
import CustomButton from "../custom-button/custom-button.component";

//redux imports
import {connect} from "react-redux";
import {addItem} from "../../store/actions/cart-actions";
import ItemDetails from "../item-details/item-details.component";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const CollectionItem = ({item,addToCart}) => {
    const {name,price,imageUrl} = item

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

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
                    <CustomButton onClick={() => addToCart(item)} inverted>Add to Cart</CustomButton>
                </div>
            </div>
            <div className='item-details'>
                <Modal isOpen={modal} toggle={toggle} className='item-modal'>
                    <ModalHeader toggle={toggle}>{name}</ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={`${imageUrl}`} style={{width: '100%', height: '100%'}} />
                            </div>
                            <div className='col-md-6'>
                                <div className='row'>
                                    <div className='col justify-content-evenly'>
                                        The Blue Beanie is a trendy hat for the winter 2020 fashion season.
                                        It can be worn with several colours of clothing
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col' style={{'margin-top': '85px'}}>
                                        <CustomButton onClick={() => addToCart(item)}>Add to Cart</CustomButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <CustomButton onClick={toggle} inverted>Close</CustomButton>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
        )
}

const mapDispatchToProps = dispatch => ({
        addToCart: item => {
            dispatch(addItem(item))
        }
    })

export default connect(null,mapDispatchToProps)(CollectionItem);
