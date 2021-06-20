import {convertCollectionsSnapshotToObject, firestore} from "../../utils/firebase.utils";

export const isFetchingCollections = () => {
    return {
        type: 'IS_FETCHING_DATA',
    }
}

export const fetchCollectionsSuccess = collectionsObject => {
    return {
        type: 'FETCH_COLLECTIONS_SUCCESS',
        payload: collectionsObject
    }
}

export const fetchCollectionsFailure = errorMessage => {
    return {
        type: 'FETCH_COLLECTIONS_FAILURE',
        payload: errorMessage
    }
}

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('shopCollections')
        dispatch(isFetchingCollections())

        collectionRef.get().then(snapshot => {
            const shopData = convertCollectionsSnapshotToObject(snapshot)
            dispatch(fetchCollectionsSuccess(shopData))
        }).catch(error => dispatch(fetchCollectionsFailure(error)))
    }
}

export const toggleItemAddedAlert = (setToggle) => {
    return {
        type: 'TOGGLE_ALERT',
    }
}