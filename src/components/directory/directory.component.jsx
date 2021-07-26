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
            <div className='row directory-items'>
                {
                    props.sections.map(({...sectionProps},index) => {
                        return(
                            <div className='col-md-6 col-sm-12'>
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