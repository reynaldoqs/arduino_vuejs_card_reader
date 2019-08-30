import firebase from 'firebase/app'
import 'firebase/database'
import {dbConfig} from './private'

const firebaseApp = firebase
  .initializeApp(dbConfig);
export const db = firebaseApp.database();
export const firebaseBase = firebase;
//para select
//https://appdividend.com/2018/04/21/vue-firebase-crud-example/