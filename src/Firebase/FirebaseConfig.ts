import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/database";
import "firebase/compat/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCncHs0oDoCmDveoAMZvSkLXuc4syN2Mg4",
  authDomain: "facebugserver.firebaseapp.com",
  databaseURL:
    "https://facebugserver-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "facebugserver",
  storageBucket: "facebugserver.appspot.com",
  messagingSenderId: "915472090039",
  appId: "1:915472090039:web:532f827244997362d29e32",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// export const firestore = firebase.firestore()

export const storageRef = firebase.storage().ref()