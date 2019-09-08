<template>
  <div class="home">

    <div class="max-w-xl mx-auto bg-white rounded-lg shadow-xl">
      <div class="bg-teal-400 text-white text-left rounded-lg rounded-b-none  px-4 py-4 mb-2">
        <p class="font-bold text-sm leading-none">Usuarios</p>
      </div>
      <div v-show="users.length === 0" class="p-3">Cargando...</div>

      <div v-for="(user,index) in users.slice().reverse()" v-bind:key="index" class="border-b text-left relative  border-grey-500 px-4 py-2">
        <p class="font-bold text-sm leading-none text-gray-600">{{user.nombre}} {{user.apellidoPaterno}} {{user.apellidoMaterno}} </p>
        <p class="text-xs font-bold text-teal-400">idCard: {{user['.key']}}</p>
        <div class="absolute top-0 bottom-0 right-0 px-5 py-3">
          <span class="flex text-white rounded-full bg-gray-700 px-2 py-1 text-xs font-bold mr-3">{{user.credito}} Bs</span>
        </div>
      </div>
    </div>
  
    <div class="max-w-sm mx-auto bg-white rounded-lg mt-10 py-3 shadow-xl">
      <div v-if="this.changedUser">
        <img class="h-20 w-20 bg-purple-300 rounded-full mx-auto" src="../assets/images/user.jpg">
        <div class="text-center">
          <h2 class="text-lg">{{this.changedUser.nombre}} {{this.changedUser.apellidoPaterno}} {{this.changedUser.apellidoMaterno}}</h2>
          <div class="text-purple-500">Credito: {{this.changedUser.credito}} bs</div>
          <div class="text-gray-600">Tarjeta: {{this.changedUser.cardId}}</div>
        </div>
      </div>
      <span v-else>No existe actividad...</span>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
//import {db} from '@/db';
import {usersDB} from '@/firebaseDB' 
      
export default {
  name: 'home',
  data(){
    return {
      users:[],
    }
  },
  firebase: {
    users: usersDB.orderByChild('fechaUltimaRecarga'),
  },
  mounted() {
     this.$firebaseRefs.users.on('child_changed', (childSnapshot) =>{
          console.log('just have changed:')
          console.log(childSnapshot.key)
          //console.log(this)
          //this is not the correct way, use vuex for this part
          this.changedUser =  {
            nombre:childSnapshot.val().nombre,
            apellidoPaterno:childSnapshot.val().apellidoPaterno,
            apellidoMaterno:childSnapshot.val().apellidoMaterno,
            credito:childSnapshot.val().credito,
            cardId:'['+childSnapshot.key+']'
          }

        })
  },
}
</script>
