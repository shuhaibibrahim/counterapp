import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDPLtNLWSizLHhroHTVdLGwzHGOlpXdCyI",
    authDomain: "counter-app-cae02.firebaseapp.com",
    projectId: "counter-app-cae02",
    storageBucket: "counter-app-cae02.appspot.com",
    messagingSenderId: "589769805070",
    appId: "1:589769805070:web:469a740d336f8595b7db5f",
    measurementId: "G-782L9JN554"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db=firebase.database()
