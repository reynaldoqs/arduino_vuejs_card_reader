import { store } from '@/store'
//import axios from 'axios'

export const checkUserSession = {
    created() {
        const currentUser = JSON.parse(sessionStorage.getItem('user'))
        if(currentUser){
            store.dispatch('signUserFromSession',currentUser)
            //axios.defaults.headers.common['Authorization'] = currentUser.token
        }
    },

}