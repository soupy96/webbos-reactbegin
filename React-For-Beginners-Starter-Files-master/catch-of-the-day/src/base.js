import Rebase from "re-base";
import firebase, { initializeApp } from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBQVs9vthAe2YKKmiydce9qewS7Ty-gnZ4",
    authDomain: "cofd3-46510.firebaseapp.com",
    databaseURL: "https://cofd3-46510.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;