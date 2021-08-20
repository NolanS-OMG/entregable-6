import firebase from "firebase";

var firebaseConfig = {

    apiKey: "AIzaSyDiSwNiNFOuKwzChlMt4-BQTquYLTV9un4",

    authDomain: "entregable-6.firebaseapp.com",

    projectId: "entregable-6",

    storageBucket: "entregable-6.appspot.com",

    messagingSenderId: "1099188887822",

    appId: "1:1099188887822:web:af3abd8fb3d44f1616b75f"

};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth,db};
export default firebase;