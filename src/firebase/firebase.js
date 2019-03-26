/* eslint-disable */

import firebase from "firebase";
import firestore from "firebase/firestore";
var config = {
  apiKey: "AIzaSyC8aKkapatYH51cezmUCoF0X6_2IAexz-Y",
  authDomain: "vue-geolocation-c7b75.firebaseapp.com",
  databaseURL: "https://vue-geolocation-c7b75.firebaseio.com",
  projectId: "vue-geolocation-c7b75",
  storageBucket: "",
  messagingSenderId: "473811475282"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
