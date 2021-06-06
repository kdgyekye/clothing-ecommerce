import React from "react";

import './component-wrapper.scss'

const ComponentWrapper = props => (
    <div className='position-relative mt-5 wrapper-style'>
        {
            props.children
        }
    </div>
)

export default ComponentWrapper