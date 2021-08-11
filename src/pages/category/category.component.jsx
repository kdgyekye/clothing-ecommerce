import React, {useEffect} from 'react'
import './category.styles.scss'

import {connect} from "react-redux";
import {selectCategories} from "../../store/selectors/collection.selector";

import CollectionItem from "../../components/collection-item/collection-item.component";

const CategoryPage = ({category}) => {

    useEffect(() => {
        document.title = `${category.title} - Unicorn Clothing`
    })
    return(
        <div className='category-page'>
            <h1 className='title'>{category?.title}</h1>
            <div className='items'>
                {
                    category?.items.map(item => (
                        <CollectionItem key={item.id} item={item}/>
                    ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state,ownProps) => (
    {
        category: selectCategories(ownProps.match.params.categoryId)(state)
    }
)
export default connect(mapStateToProps)(CategoryPage)