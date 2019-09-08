<template>
  <div class="about">
    
    <div class="max-w-xl mx-auto bg-white rounded-lg shadow-xl">
      
      <div class="bg-teal-400 text-white text-left rounded-lg rounded-b-none  px-4 py-4">
        <p class="font-bold text-sm leading-none">Recargas</p>
      </div>

      <div class="flex  flex-wrap">

        <div class="w-full md:w-2/4 p-4 text-center text-gray-200">
          <div class="relative">
            <select v-model="userSelected" class="font-bold block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
              <option class="font-bold" v-for="(user,index) in users" v-bind:key="index" v-bind:value="user">
                <span >{{index+1}}</span> - {{user.nombre}}
              </option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <div class="relative p-4 text-left text-gray-600">
            <span v-if="userSelected == null">Seleccionar un usuario!</span>
            <div v-else>
            <span>Usuario: {{userSelected.nombre}} {{userSelected.apellidoPaterno}} {{userSelected.apellidoMaterno.charAt(0)}}.</span>
            <p class="font-bold">
              Credito: {{userSelected.credito}} bs
            </p>
            </div>
          </div>

        </div>

        <div class="w-full md:w-2/4 p-4 text-center text-gray-700">
            <form class="w-full mx-auto max-w-sm" v-on:submit.prevent="onSubmit">
              
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
      </div>

    </div>
  </div>
</template>
<script>
import {db,firebaseBase} from '@/db';
export default {
  name: 'recargas',
  data(){
    return {
      users: [],
      userSelected: null,
      currentMount: null,
    }
  },
  firebase: {
    users: db.ref('users'),
  },
  methods: {
    recharge(){
      if(this.userSelected && this.currentMount > 0){

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

    }
  },
}
</script>