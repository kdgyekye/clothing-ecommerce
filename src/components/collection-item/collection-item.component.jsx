import React, {useState} from "react";

import CustomButton from "../custom-button/custom-button.component";
import ItemDetails from "../item-details/item-details.component";
import "bootstrap-icons/font/bootstrap-icons.css"

//redux imports
import {connect} from "react-redux";
import {addItem} from "../../store/actions/cart-actions";

import './collection-item.styles.scss'
import 'fontawesome'
import {toggleItemAddedAlert} from "../../store/actions/collection.actions";

const CollectionItem = ({item,addToCart, alertToggle}) => {
    const {name,price,imageUrl} = item

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div>
            <div className='card collection-item shadow-sm'>
                    <div
                        className='image'
                        style={{backgroundImage: `url(${imageUrl})`}}
                        data-toggle="modal" data-target="#itemDetailsModal" onClick={toggle}
                    />
                    <div className='product-actions'>
                        <CustomButton  data-toggle="modal" data- target="#itemDetailsModal" onClick={toggle} inverted>View Item
                            <i className='bi bi-eye text-primary' style={{marginLeft: '10px'}}/>
                        </CustomButton>
                    </div>
                    <div className='collection-footer' >
                        <div style={{color: '#e8bb08'}}>
                            <i className='fa fa-star' aria-hidden='true' />
                            <i className='fa fa-star' aria-hidden='true' />
                            <i className='fa fa-star' aria-hidden='true' />
                            <i className='fa fa-star' aria-hidden='true' />
                            <i className='fa fa-star-half' aria-hidden='true' />
                        </div>
                        <div className='details'>
                            <div className='name-price'>
                                <div className='name'>{name}</div>
                                <div className='price'>{`$${price}`}</div>
                            </div>
                            <div className='view'>
                                <button className='cart-add btn-primary' onClick={() => {
                                    addToCart(item)
                                    alertToggle(true)
                                }}><i className='fas fa-shopping-cart'/></button>
                            </div>
                        </div>
                    </div>
            </div>
            <ItemDetails item={item} modal={modal} setModal={setModal}/>
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
