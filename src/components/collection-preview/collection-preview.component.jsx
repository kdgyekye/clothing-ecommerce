import React, {useState} from 'react'

import './collection-preview.styles.scss'

import CollectionItem from "../collection-item/collection-item.component";
import {Link} from "react-router-dom";

import {Tooltip} from "reactstrap";

const CollectionPreview  = ({title, items}) => {

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div className='collection-preview'>
            <div className='d-flex flex-row align-items-center mb-2'>
                <h1 className='title'>{title}</h1>
                <Link to={`shop/${title.toLowerCase()}`} className='go' id='TooltipExample'>
                    <i className="bi bi-arrow-right-circle-fill m-2"/>
                </Link>
            </div>
            <Tooltip placement="top" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                View More Items
            </Tooltip>
            <div className='preview'>
                {
                    items.filter((item, index) => index < 4).map((item) => {
                        return (
                            <CollectionItem key={item.id} item={item}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CollectionPreview