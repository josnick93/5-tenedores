import firebase from "firebase/app";

const firebaseConfig = {
  // Your web app's Firebase configuration

  apiKey: "AIzaSyBPl1RjLINw5ZFZxSuQ9-deyfS1ScC-LJk",
  authDomain: "tenedores-2ea46.firebaseapp.com",
  databaseURL: "https://tenedores-2ea46.firebaseio.com",
  projectId: "tenedores-2ea46",
  storageBucket: "tenedores-2ea46.appspot.com",
  messagingSenderId: "812824313794",
  appId: "1:812824313794:web:2c6f66f3c45ba87645205b",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
