import React from 'react'
import './category.styles.scss'

import {connect} from "react-redux";
import {selectCategoryItems} from "../../store/selectors/collection.selector";

import CollectionItem from "../../components/collection-item/collection-item.component";

const CategoryPage = ({category}) => (
    <div className='category-page'>
        <h1 className='title'>{category.title}</h1>
        <div className='items'>
            {
                category.items.map(item => (
                    <CollectionItem key={item.id}  item={item}/>
                ))
            }
        </div>
    </div>
)

const mapStateToProps = (state,ownProps) => (
    {
        category: selectCategoryItems(ownProps.match.params.categoryId)(state)
    }
)
export default connect(mapStateToProps)(CategoryPage)