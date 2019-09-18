import '@/assets/css/tailwind.css'

//firebase init
import firebase from 'firebase/app'
import 'firebase/database'

import {dbConfig} from '@/config/dbConfig'

firebase.initializeApp(dbConfig)

//font awesome 
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faExclamation, faTimes, faImage, faUpload, faFirstAid, faFireExtinguisher, faTools, faCog, faExclamationTriangle, faAd} from '@fortawesome/free-solid-svg-icons'
import { faGoogle,faFacebookF} from '@fortawesome/free-brands-svg-icons'

library.add(faExclamation)
library.add(faTimes)
library.add(faImage)
library.add(faUpload)

library.add(faFirstAid)
library.add(faFireExtinguisher)
library.add(faTools)
library.add(faCog)
library.add(faExclamationTriangle)
library.add(faAd)


library.add(faGoogle)
library.add(faFacebookF)
Vue.component('font-awesome-icon', FontAwesomeIcon)

//vuejs modal
import VModal from 'vue-js-modal'
Vue.use(VModal)
//vuejs notifications
import Notifications from 'vue-notification'
Vue.use(Notifications)

//vue-search-select
import 'vue-search-select/dist/VueSearchSelect.css'

//custom filter date

Vue.filter('fecha', (value) => {
    let splited = value.split('-')
    const year = splited[0]
    const month = splited[1]
    const day = splited[2].split('T')[0]
    //const hrs = splited[2].split('T')[1].substring(0,5)
    return `${day}/${month}/${year}`
})