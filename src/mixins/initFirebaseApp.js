import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'


export const firebaseChanges = {
    created() {

        /*firebase.auth().onAuthStateChanged((user) => {
            if(user){
                //dispatch to store
                console.log(user)
            }
        })*/
        var usersRef = firebase.database().ref('users');
        usersRef.on('child_changed', function(data) {
            console.log(data.val())
        })

        console.log('setup firebase done')
    },

}