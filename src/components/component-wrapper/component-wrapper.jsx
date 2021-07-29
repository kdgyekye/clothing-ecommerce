import React from "react";

import './component-wrapper.scss'

const ComponentWrapper = props => (
    <div className='position-relative wrapper-style'>
        {
            props.children
        }
    </div>
)

export default ComponentWrapper