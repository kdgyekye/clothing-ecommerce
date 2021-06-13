import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDq-5nJLechPcSiyNyTrCjoF1cAa5XHj6w",
    authDomain: "e-commerce-a7592.firebaseapp.com",
    projectId: "e-commerce-a7592",
    storageBucket: "e-commerce-a7592.appspot.com",
    messagingSenderId: "308076184321",
    appId: "1:308076184321:web:fecdbaf3b18e805ac9d100",
    measurementId: "G-YXHFSTW6C8"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const createUserProfileDocument = async (authUser, additionalData) => {
    if(!authUser) return

    const userRef = firestore.doc(`users/${authUser.uid}`)
    const collectionRef = firestore.collection('users')
    console.log(userRef)
    const collectionSnapshot = await collectionRef.get();
    console.log({collectionSnapshot})

    try{
        const snapshot = await userRef.get()
        console.log(snapshot)

        if (!snapshot.exists) {
            const {displayName,email} = authUser
            const createdAt = new Date()

            try {
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
            }catch (error) {
                console.log('An error occurred: ',error)
            }
        }
    return userRef
    }
    catch (error) {
        console.log('An error occurred', error)
    }
}

// export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
//     const collectionRef = firestore.collection(collectionKey)
//     console.log(collectionRef)
//
//     const batch = firestore.batch()
//     objectsToAdd.forEach(object => {
//         const newDocRef = collectionRef.doc()
//         batch.set(newDocRef, object)
//     })
//
//     return await batch.commit()
// }

export const convertCollectionsSnapshotToObject = (collections) => {
    const convertedCollection = collections.docs.map( doc => {
        const {title,items} = doc.data()

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    console.log(convertedCollection)
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt': 'select_account' })
export const signInWithGoogle = () => auth
    .signInWithPopup(provider)
    .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
    });

export default firebase