import React from 'react'
import {ClipLoader} from "react-spinners";

const SpinnerLoader = () => {
    return (
        <div className='spinneroverlay'>
            <ClipLoader size={50} color={"#4f4bd7"}/>
        </div>
    )
}

export default SpinnerLoader