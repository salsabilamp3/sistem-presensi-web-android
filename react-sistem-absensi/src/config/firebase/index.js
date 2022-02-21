import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB04Z5p4Se9D0LATaPULw9FIvMEzCjUHW0",
    authDomain: "percobaan-f2d74.firebaseapp.com",
    databaseURL: "https://percobaan-f2d74-default-rtdb.firebaseio.com",
    projectId: "percobaan-f2d74",
    storageBucket: "percobaan-f2d74.appspot.com",
    messagingSenderId: "602656284009",
    appId: "1:602656284009:web:956623abee637443a0f1f8",
    measurementId: "G-DQN2PZK8QS"


  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const database = firebase.database();


  export default firebase;
