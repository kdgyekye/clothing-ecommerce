import React, {useState} from "react";

import './collection-item.styles.scss'
import CustomButton from "../custom-button/custom-button.component";

//redux imports
import {connect} from "react-redux";
import {addItem} from "../../store/actions/cart-actions";
import ItemDetails from "../item-details/item-details.component";

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
                    <button className='view' data-toggle="modal" data-target="#itemDetailsModal" onClick={() => toggle()}>View</button>
                    <CustomButton onClick={() => addToCart(item)} inverted>Add to Cart</CustomButton>
                </div>
            </div>
            <ItemDetails name price imageUrl modal/>
        </div>
        )
}

const mapDispatchToProps = dispatch => ({
        addToCart: item => {
            dispatch(addItem(item))
        }
    })

export default connect(null,mapDispatchToProps)(CollectionItem);
