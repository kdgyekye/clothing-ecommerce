import React, {useEffect} from 'react'

import {connect} from "react-redux";
import {selectCollectionsForPreview} from "../../store/selectors/collection.selector";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import './collection-overview.styles.scss'

const CollectionOverview = props => {
    const {collectionItems} = props
    console.log(collectionItems)

    useEffect(() => {
        document.title = `Shop - Unicorn Clothing`
    })
    return(
        <div>
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
    collectionItems: selectCollectionsForPreview(state)
})

export default connect(mapStateToProps)(CollectionOverview)