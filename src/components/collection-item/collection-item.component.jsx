import React from "react";

import './collection-item.styles.scss'
import CustomButton from "../custom-button/custom-button.component";

//redux imports
import {connect} from "react-redux";
import {addItem} from "../../store/actions/cart-actions";

const CollectionItem = ({item,addToCart}) => {
    const {name,price,imageUrl} = item
    return (
        <div className=''>
            <div className='collection-item'>
                <div
                    className='image'
                    style={{backgroundImage: `url(${imageUrl})`}}
                />
                <div className='collection-footer' >
                    <div className='name'>{name}</div>
                    <div className='price'>{price}</div>
                </div>
                <CustomButton onClick={() => addToCart(item)} inverted>Add to Cart</CustomButton>
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
