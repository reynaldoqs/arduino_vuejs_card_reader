import firebase from 'firebase/app'
import 'firebase/database'

export var usersDB = firebase.database().ref('users');
export var transaccionesDB = firebase.database().ref('transacciones');