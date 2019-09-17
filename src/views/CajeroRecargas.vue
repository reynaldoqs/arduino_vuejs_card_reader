<template>
  <div class="w-full router-view-height flex items-center justify-center">
    
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-xl">

      <div class="flex  flex-wrap">

        <div class="w-full md:w-2/4 p-4 text-center text-gray-200">
          <div class="relative">

            <model-list-select
                    :list="users"
                    v-model="objectItem"
                    option-value="idTarjeta"
                    :custom-text="codeAndNameAndDesc"
                    placeholder="Seleccionar usuario">
            </model-list-select>
          </div>
            <form class="w-full mt-6 mx-auto max-w-sm" v-on:submit.prevent="onSubmit">
              
              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold text-sm md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Monto
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input @keyup.enter="recharge" type="text" v-model.number="currentMount" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="inline-full-name"  value="12">
                </div>
              </div>

              <div class="md:flex md:items-center py-2">
                <div class="md:w-1/3"></div>
                <div class="md:w-2/3">
                  <button @click="recharge" class="shadow bg-teal-500 hover:bg-teal-700 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                    Recargar
                  </button>
                  
                </div>
              </div>
            </form>


        </div>

        <div class="w-full md:w-2/4 p-4 text-center text-gray-700">

            <warning-icon message="Seleccione un usuario"/>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/database'
import { ModelListSelect } from 'vue-search-select'
import WarningIcon from '@/components/WarningIcon'

export default {
  name: 'recargas',
  data(){
    return {
        users: [],
        currentMount: null,
        objectItem: {},
    }
  },
  firebase: {
    users: firebase.database().ref('transacciones'),
  },
  methods: {
    codeAndNameAndDesc (item) {
        return `[${item.idTarjeta}] ${item.nombres} ${item.apellidoPaterno} ${item.apellidoMaterno} `
    },
    recharge(){
      /*if(this.userSelected && this.currentMount > 0){

        let objId = this.userSelected['.key'];
        let {credito} = this.userSelected; 
        this.$firebaseRefs.users.child(objId).update({fechaUltimaRecarga: firebaseBase.database.ServerValue.TIMESTAMP, credito:(credito + this.currentMount)}).then(()=>{

          this.$firebaseRefs.users.child(objId+'/recargas').push({fechaRecarga: firebaseBase.database.ServerValue.TIMESTAMP,monto:this.currentMount,cajero:'Cajero sin definir'})
          this.currentMount = null;
          this.userSelected = null;
        });
        

      }else{
        console.log('User unselected or mount is 0!')
      }
*/
    },
    reset () {
        this.objectItem = {}
    },
    selectFromParentComponent1 () {
        // select option from parent component
        this.objectItem = this.options[0]
    }
  },
    components: {
      ModelListSelect,
      WarningIcon
    }
}
</script>