import React, {useState,useEffect} from "react";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CategoryPage from "../category/category.component";
import {Route} from "react-router-dom";
import {withRouter} from "react-router-dom";

import {firestore, convertCollectionsSnapshotToObject} from "../../utils/firebase.utils";

//redux imports
import {connect} from "react-redux";
import {updateShopData} from "../../store/actions/collection.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CategoryPageWithSpinner = WithSpinner(CategoryPage)

const Shop = props => {
    const [loading, setLoading] = useState(true)
    const {updateCollections} = props

    useEffect( () => {
        const collectionRef = firestore.collection('shopCollections')
        collectionRef.get().then(snapshot => {
            const shopData = convertCollectionsSnapshotToObject(snapshot)
            updateCollections(shopData)
            setLoading(false)
        })
    },[])
        return(
            <div className='shop'>
                <Route exact path={`${props.match.path}`} render={(props) => (
                    <CollectionOverviewWithSpinner isLoading={loading} {...props}/>)} />
                <Route exact path={`${props.match.path}/:categoryId`}  render={(props) => (
                    <CategoryPageWithSpinner isLoading={loading} {...props}/>)} />
            </div>
        )
}

const mapDispatchToProps =  dispatch => ({
    updateCollections: (collectionsObject) => dispatch(updateShopData(collectionsObject))
})

export default withRouter(connect(null,mapDispatchToProps)(Shop))