import React from 'react'

import {GridLoader} from "react-spinners";

import './spinner-loader.styles.scss'

const SpinnerLoader = () => {

    const spinnerStyles = {
        height: '60vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    return (
        <div style={spinnerStyles}>
            <GridLoader size={15} color={"#643df1"}/>
        </div>
    )
}

export default SpinnerLoader