import React from 'react'

import {connect} from "react-redux";
import {selectionCollectionItems} from "../../store/selectors/collection.selector";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

const CollectionOverview = props => {
    const {collectionItems} = props
    return(
        <div className='collection-overview'>
            {
                collectionItems.map(({id, ...collection}) => {
                    return(
                        <CollectionPreview key={id} {...collection} />
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = state => ({
    collectionItems: selectionCollectionItems(state)
})

export default connect(mapStateToProps)(CollectionOverview)