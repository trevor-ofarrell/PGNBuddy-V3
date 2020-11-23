import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "YOUR API KEY",
    authDomain: "YOUR AUTH DOMAIN",
    databaseURL: "https://pgnbuddy.firebaseio.com",
    projectId: "pgnbuddy",
    storageBucket: "pgnbuddy.appspot.com",

};
try {
firebase.initializeApp(firebaseConfig);
} catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

const fire = firebase;

export default fire;