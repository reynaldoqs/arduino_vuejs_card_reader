import firebase from 'firebase/app'
import 'firebase/database'
import { store } from '@/store'
export const transactionsChanges = {
    created() {
        firebase.database().ref('transacciones').on('child_changed',(snatpshot) => {
            const acepted = ['actualizacion','descuento','validacion']
            const data = snatpshot.val()
            if(data && acepted.includes(data.type)){
                store.dispatch('addTransaction',data)
                this.$notify({
                    group: 'foo',
                    data: data
                  });
            }
        })
    }
}