import React, {useState} from "react";

import CustomButton from "../custom-button/custom-button.component";
import ItemDetails from "../item-details/item-details.component";

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
            <div className='collection-item card shadow-sm'>
                <div
                    className='image'
                    style={{backgroundImage: `url(${imageUrl})`}}
                    data-toggle="modal" data- target="#itemDetailsModal" onClick={toggle}
                />
                <div className='product-actions'>
                    <CustomButton  data-toggle="modal" data- target="#itemDetailsModal" onClick={toggle} inverted>View Item</CustomButton>
                </div>
                <div className='collection-footer rounded-bottom' >
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
