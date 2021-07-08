import firebase from "firebase";
import "firebase/auth";
require('dotenv').config()
const app=firebase.initializeApp({
    apiKey: process.env.REACT_APP_APIKEY ,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId:  process.env.REACT_APP_PROJECTID,
    storageBucket:  process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId:  process.env.REACT_APP_MESSAGINGID,
    appId:  process.env.REACT_APP_APPID,
    measurementId:  process.env.REACT_APP_MEASUREMENTID
})
console.log(process.env.REACT_APP_APIKEY);
export default app;
export const googleprovider=new firebase.auth.GoogleAuthProvider();