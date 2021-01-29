import firebase from 'firebase'
import 'firebase/firebase-firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCnJ_PHAARtuulQAiSA4rv5EWwTKVgBFTQ",
    authDomain: "reactn-restaurant-firebase.firebaseapp.com",
    projectId: "reactn-restaurant-firebase",
    storageBucket: "reactn-restaurant-firebase.appspot.com",
    messagingSenderId: "553664382558",
    appId: "1:553664382558:web:2c0d86ad8ffb9e3b3b56cf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default {
      firebase,
      db
  }