import React, {Component} from 'react'

import './alert.styles.scss'
import {Link} from "react-router-dom";

class Alert extends Component{

    constructor(props) {
        super(props);

        this.state = {
            updatedCart: 0
        }

    }

    render() {
        return (
            <div>
                <div className="alert alert-success alert-dismissible cart-alert">
                    <span><strong>Item Added!</strong> You have added item to the cart</span>
                    <Link href="#" className="close" data-dismiss="alert" aria-label="close" onClick={
                        (e) => e.target.classList.add('hidden')}>&times;</Link>
                </div>
            </div>
        );
    }
}

export default Alert