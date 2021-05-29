import React from 'react'
import './category.styles.scss'

import {connect} from "react-redux";
import {selectCategoryItems} from "../../store/selectors/collection.selector";

import CollectionItem from "../../components/collection-item/collection-item.component";

const CategoryPage = (props) => {
    console.log(props.category)
    return (
        <div className='category'>
            <h2 className='title'>{props.category.title}</h2>
            <div className='preview'>
                {
                    props.category.items.map(item => (
                        <CollectionItem key={item.id}  item={item}/>
                    ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state,ownProps) => (
    {
        category: selectCategoryItems(ownProps.match.params.categoryId)(state)
    }
)
export default connect(mapStateToProps)(CategoryPage)