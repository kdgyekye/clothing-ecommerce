import React from "react";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

//redux imports
import {connect} from "react-redux";
import {selectionCollectionItems} from "../../store/selectors/collection.selector";

const Shop = props => {
        const {collectionItems} = props
        return(
            <div className='shop'>
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

export default connect(mapStateToProps)(Shop)