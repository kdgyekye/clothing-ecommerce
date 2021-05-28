import React from 'react'

import './directory.styles.scss'
import directoryData from './directory-data'

//redux imports
import {connect} from "react-redux";
import {selectDirectorySections} from "../../store/selectors/directory.selector";

//component imports
import MenuItem from "../menu-item/menu-item.component";

const Directory = ({sections}) => {
    return(
        <div className='directory-menu'>
            {
                sections.map(({...sectionProps},index) => {
                    return(
                        <MenuItem key={index}
                                  {...sectionProps}
                        />
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = state => ({
    sections: selectDirectorySections(state)
})
export default connect(mapStateToProps)(Directory)