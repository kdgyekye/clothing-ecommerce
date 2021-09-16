import React , {Fragment} from "react";

import './landing-slideshow.styles.scss'
import '../../assets/slideshow.css'

const LandingSlideshow = (props) => {
    return (
        <Fragment>
            <div className='container-fluid'>
                <div className='hero'>
                    <ul className="cb-slideshow">
                        <li><span>Image 01</span></li>
                        <li><span>Image 02</span></li>
                        <li><span>Image 03</span></li>
                        <li><span>Image 04</span></li>
                        <li><span>Image 05</span></li>
                        <li><span>Image 06</span></li>
                        <li><span>Image 07</span></li>
                        <li><span>Image 08</span></li>
                        <li><span>Image 09</span></li>
                        <li><span>Image 10</span></li>
                    </ul>
                    <div className="overlay-itro"/>
                    <div className="hero-content display-table">
                        <div className="table-cell">
                            <div className="container">
                                <h1 className="hero-title mb-4">Welcome To Our Store</h1>
                                <p className="hero-subtitle"><span className="typed" id= 'typing-stuff' data-typed-items="HAPPY, BIRTHDAY!!, :) "/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
        )
}

export default LandingSlideshow