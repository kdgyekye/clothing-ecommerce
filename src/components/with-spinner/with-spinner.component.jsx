import React from "react";

import SpinnerLoader from "../loaders/spinner-loader.component";

const WithSpinner = WrappedComponent => {
    const Spinner = ({isLoading, ...other}) => {
        return isLoading? (
                <SpinnerLoader />
            )
            :
            <WrappedComponent {...other} />
    }
    return Spinner
}

export default WithSpinner