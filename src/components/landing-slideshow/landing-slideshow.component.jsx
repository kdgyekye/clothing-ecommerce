import React , {Fragment} from "react";

import './landing-slideshow.styles.scss'
import '../../assets/slideshow.css'

const LandingSlideshow = (props) => {
    return (
        <Fragment>
            <div className='container-fluid cb-slideshow'>
                <ul className="cb-slideshow slideshow">
                    <li><span>Image 01</span></li>
                    <li><span>Image 02</span></li>
                    <li><span>Image 03</span></li>
                    <li><span>Image 04</span></li>
                    <li><span>Image 05</span></li>
                </ul>
            </div>
        </Fragment>
        )
}

export default LandingSlideshow