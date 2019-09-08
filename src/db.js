import firebase from 'firebase/app'
import 'firebase/database'

//importar tu configuracion de firebase aqui
//import {dbConfig} from './config/dbConfig'

/*const firebaseApp = firebase
  .initializeApp(dbConfig);*/

export const db = firebase.database();
export const firebaseBase = firebase;

//para select
//https://appdividend.com/2018/04/21/vue-firebase-crud-example/