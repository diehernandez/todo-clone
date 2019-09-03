import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp ({
    apiKey: "AIzaSyAnlfb13uVGFPMdeWdZ4vwv6ZUsEVYZD98",
    authDomain: "todoapp-9bba0.firebaseapp.com",
    databaseURL: "https://todoapp-9bba0.firebaseio.com",
    projectId: "todoapp-9bba0",
    storageBucket: "todoapp-9bba0.appspot.com",
    messagingSenderId: "913816975108",
    appId: "1:913816975108:web:6d1a3516ca03513e"
});

export { firebaseConfig as firebase} ;