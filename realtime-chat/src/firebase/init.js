import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDNkBJEKGjToeFo6Dgg1qabMTg0kGUf8Ms",
    authDomain: "udemy-ninja-smoothies-10410.firebaseapp.com",
    databaseURL: "https://udemy-ninja-smoothies-10410.firebaseio.com",
    projectId: "udemy-ninja-smoothies-10410",
    storageBucket: "udemy-ninja-smoothies-10410.appspot.com",
    messagingSenderId: "465162368983",
    appId: "1:465162368983:web:26742d89dca2359c333d92"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const db = firebaseApp.firestore();
  export const auth = firebaseApp.auth();