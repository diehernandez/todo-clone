import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp ({
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTHDOMAIN}` ,
    databaseURL: `${process.env.REACT_APP_DATABASEURL}` ,
    projectId: `${process.env.REACT_APP_PROJECTID}` ,
    storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}` ,
    messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
    appId: `${process.env.REACT_APP_APPID}`
});

export { firebaseConfig as firebase} ;
