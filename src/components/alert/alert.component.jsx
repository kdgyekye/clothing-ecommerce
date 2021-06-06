import React, {Component} from 'react'

import './alert.styles.scss'

class Alert extends Component{

    constructor(props) {
        super(props);

        this.state = {
            updatedCart: 0
        }

    }

    render() {
        return (
            <div className='cart-alert'>
                <div className="alert alert-success alert-dismissible">
                    <span><strong>Item Added!</strong> You have added item to the cart</span>
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                </div>
            </div>
        );
    }
}

export default Alert