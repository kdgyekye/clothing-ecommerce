import React from 'react'

import './directory.styles.scss'

//redux imports
import {connect} from "react-redux";
import {selectDirectorySections} from "../../store/selectors/directory.selector";

//component imports
import MenuItem from "../menu-item/menu-item.component";

const Directory = (props) => {
    return(
        <div className='directory-menu'>
            <div className='row d-flex justify-content-around'>
                {
                    props.sections.map(({...sectionProps},index) => {
                        return(
                            <div className='col-lg-4 col-md-6 col-sm-12'>
                                <MenuItem key={index}
                                          {...sectionProps}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    sections: selectDirectorySections(state)
})
export default connect(mapStateToProps)(Directory)