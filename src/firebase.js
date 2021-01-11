import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage"; //追加

// .envに書いたファイルを参照している jsonファイルの変更(dependencie)があった場合は、必ずnpm iする
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage(); //追加
// Router認証用
export default firebase;
