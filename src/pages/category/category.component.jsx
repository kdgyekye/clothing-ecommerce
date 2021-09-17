import React, {useEffect, useState} from 'react'
import './category.styles.scss'

import {connect} from "react-redux";
import {selectCategories} from "../../store/selectors/collection.selector";

import CollectionItem from "../../components/collection-item/collection-item.component";
import {Link} from "react-router-dom";
import {Tooltip} from "reactstrap";

const CategoryPage = ({category, ...otherProps}) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    console.log(`Category: ${category}`)
    console.log(`Props: ${{otherProps}}`)
    useEffect(() => {
        document.title = `${category?.title} - Unicorn Clothing`
    })
    return(
        <div className='category-page'>
            <div className='d-flex flex-row justify-content-center'>
                <Link to={`/shop`} className='go' id='TooltipExample'>
                    <i className="bi bi-arrow-left-circle-fill m-2"/>
                </Link>
                <h1 className='title'>{category?.title}</h1>
            </div>
            <Tooltip placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
               Back To Shop
            </Tooltip>
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