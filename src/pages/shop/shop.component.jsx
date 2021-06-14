import React, {useEffect} from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryPage from "../category/category.component";
import {Route} from "react-router-dom";
import {withRouter} from "react-router-dom";

import {firestore, convertCollectionsSnapshotToObject} from "../../utils/firebase.utils";

//redux imports
import {connect} from "react-redux";
import {updateShopData} from "../../store/actions/collection.actions";

const Shop = props => {
    const {updateCollections} = props

    useEffect( () => {
        const collectionRef = firestore.collection('shopCollections')
        collectionRef.onSnapshot( async snapshot => {
            const shopData = convertCollectionsSnapshotToObject(snapshot)
            updateCollections(shopData)
        })
    },[])
        return(
            <div className='shop'>
                <Route exact path={`${props.match.path}`} component={CollectionOverview} />
                <Route exact path={`${props.match.path}/:categoryId`}  component={CategoryPage}/>
            </div>
        )
}

const mapDispatchToProps =  dispatch => ({
    updateCollections: (collectionsObject) => dispatch(updateShopData(collectionsObject))
})

export default withRouter(connect(null,mapDispatchToProps)(Shop))