import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "YOUR API KEY",
    authDomain: "YOUR AUTH DOMAIN",
    databaseURL: "YOUR DATABASE URL",
    projectId: "YOUR PROJECT ID ",
    storageBucket: "YOUR STORAGE BUCKET",
    messagingSenderId: "YOUR SENDER ID ",
    appId: "YOUR APP ID"
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