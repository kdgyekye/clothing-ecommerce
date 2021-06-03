import React from 'react'

import './collection-preview.styles.scss'

import CollectionItem from "../collection-item/collection-item.component";
import {Link} from "react-router-dom";

const CollectionPreview  = ({title, items}) => (
    <div className='container-fluid'>
        <div className='collection-preview'>
            <h1 className='title'><Link to={`shop/${title.toLowerCase()}`}>{title}</Link></h1>
            <div className='preview'>
                {
                    items.filter((item,index) => index < 4).map((item) => {
                        return (
                            <CollectionItem key={item.id} item={item}/>
                        )
                    })}
            </div>
        </div>
    </div>
)

export default CollectionPreview