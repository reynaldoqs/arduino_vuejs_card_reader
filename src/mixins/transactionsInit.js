import firebase from 'firebase/app'
import 'firebase/database'
import { store } from '@/store'
export const transactionsChanges = {
    created() {
        firebase.database().ref('transacciones').on('child_changed',(snatpshot) => {

           /*data.ref.child('relevos').on("child_changed", function(itemSnapshot) {
                console.log(itemSnapshot.val());
            });*/

            if(snatpshot.val()){
                store.dispatch('addTransaction',snatpshot.val())
                //console.log(this.$notify)
                this.$notify({
                    group: 'foo',
                    data: snatpshot.val()
                  });
            }
        })
        console.log('reviones setup done')
    }
}