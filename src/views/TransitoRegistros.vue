<template>
    <div class="router-view-height flex">
       <div class="router-view-height w-full flex justify-center py-4 px-2">
           <div class="w-full mb-16 max-w-6xl  bg-white rounded-lg shadow-xl select-none">
               <div class="flex py-4 px-6 rounded-t-lg justify-between bg-gray-100">
                   <div>Buscar</div>
                   <button @click="openCreate" class="inline-block text-sm px-8 py-2 mr-4 leading-none border rounded-full text-white bg-purple-600 hover:border-transparent hover:text-purple-600 hover:border-purple-600 hover:bg-white mt-4 lg:mt-0">Adicionar</button>
               </div>
                <table class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
                <thead class="bg-gray-100">
                    <tr class="text-gray-700 text-sm">
                    <th class="py-4 px-6 bg-grey-lightest font-bold border-b border-grey-light">Datos Personales</th>
                    <th class="py-4 px-6 bg-grey-lightest font-bold border-b border-grey-light">Ide Tarjeta</th>
                    <th class="py-4 px-6 bg-grey-lightest font-bold border-b border-grey-light">Credito</th>
                    <th class="py-4 px-6 bg-grey-lightest font-bold border-b border-grey-light">Nro. de Licencia</th>
                    <th class="py-4 px-6 bg-grey-lightest font-bold border-b border-grey-light">Datos del Vehiculo</th>
                    <th class="py-4 px-6 bg-grey-lightest font-bold border-b border-grey-light">Acciones</th>
                    </tr>
                </thead>
                <div v-show="transacciones.length === 0" class="p-3">Cargando...</div>
                <tbody>
                    <tr v-for="(transaccion, index) in transacciones" :key="index" class="hover-control text-sm text-gray-600 hover:bg-gray-200">
                        <td class="py-2 px-6 border-b border-grey-light flex items-center">
                            <img class="w-10 h-10 rounded-full object-cover bg-gray-300" :src="transaccion.photoUrl" alt="">
                            <div class="ml-3 leading-tight">
                                <p class="text-gray-700">{{transaccion.nombres}} {{transaccion.apellidoPaterno}} {{transaccion.apellidoMaterno?transaccion.apellidoMaterno.charAt(0):''}}</p>
                                <p>Carnet: {{transaccion.ci}}</p>
                            </div>
                        </td>
                        <td class="py-2 px-6 border-b border-grey-light">{{transaccion.idTarjeta}}</td>
                        <td class="py-2 px-6 border-b border-grey-light">{{transaccion.credito?transaccion.credito:0}} Bs</td>
                        <td class="py-2 px-6 border-b border-grey-light">{{transaccion.licencia}}</td>
                        <td class="py-2 px-6 border-b border-grey-light">
                            <div class="ml-3 leading-tight">
                                <p class="text-gray-700">Tipo: {{transaccion.clase}}</p>
                                <p>Placa: {{transaccion.nroPlaca}}</p>
                            </div>
                        </td>
                        <td class="py-2 px-6 border-b border-grey-light">
                            <button @click="modificar(transaccion)" class="hide-amd inline-block text-xs px-2 py-1 leading-none border rounded-full text-orange-400 border-orange-400 hover:border-transparent hover:text-white hover:bg-orange-400">Editar</button>
                            <button @click="eliminar(transaccion)" class="hide-amd ml-2 inline-block text-xs px-2 py-1 leading-none border rounded-full text-red-600 border-red-600 hover:border-transparent hover:text-white hover:bg-red-600">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
                </table>
           </div>  
       </div>
       <modal height="auto" :clickToClose="false" name="create-card" :width="800">
            <transito-reg-card v-on:onCancel="cerrar()" v-on:onAcept="createUser()"  @onAddRelevo="onAddRelevo" @onImageUploaded="onImageUploaded" :objValue="newObj" :editable="true" :isValidate="false"></transito-reg-card>
        </modal>
       <modal height="auto" :clickToClose="false" name="edit-card" :width="800">
            <transito-reg-card v-on:onCancel="cerrar()" v-on:onAcept="editUser()" @onImageUploaded="onImageUploaded" :objValue="editObj" :editable="true" :isValidate="false"></transito-reg-card>
        </modal>
    </div>
</template>
<script>

import TransitoRegCard from '@/components/TransitoRegCard'

import {transaccionesDB} from '@/firebaseDB'

export default {
    data() {
        return{
            newObj:{},
            editObj:{},
            editable: true,
            transacciones:[],
            oldId: null,
            photoUrl: null,
            carPhotoUrl: null
        }
    },
    firebase: {
        transacciones: transaccionesDB,
    },
    methods:{
        openCreate(){
            this.$modal.show('create-card')
        },
        createUser(){
            if(this.newObj.idTarjeta){
                let objId = this.newObj.idTarjeta;
                let orbj = {...this.newObj,photoUrl:this.photoUrl,carPhotoUrl:this.carPhotoUrl}
                transaccionesDB.child(objId).update(orbj).then(()=>{
                    this.cerrar()
                })
                
            }else{
                alert("El id tarjeta es necesario")
            }
        },
        modificar(obj){
            this.editObj = {...obj}
            this.oldId = obj.idTarjeta
            this.$modal.show('edit-card',)
        },
        editUser(){
            if(this.editObj.idTarjeta){
                let objId = this.editObj.idTarjeta;
                 let orbj = {...this.editObj}
                if(this.photoUrl){
                    orbj = {...orbj, photoUrl:this.photoUrl}
                }
                if(this.carPhotoUrl){
                    orbj = {...orbj, carPhotoUrl:this.carPhotoUrl}
                }
                transaccionesDB.child(objId).update(orbj).then(()=>{
                    if(this.oldId && this.oldId !== objId){
                        transaccionesDB.child(this.oldId).remove();
                        this.oldId = null
                    }
                    this.cerrar()
                })
                
            }else{
                alert("El id tarjeta es necesario");
            }
        },
        eliminar(obj){
            if (confirm("Eliminar el elemento?")) {
                transaccionesDB.child(obj.idTarjeta).remove();
            }
        },
        cerrar(){
            this.newObj = {}
            this.editable = {}
            this.photoUrl = null
            this.carPhotoUrl = null
            this.$modal.hide('create-card');
            this.$modal.hide('edit-card');
        },
        onImageUploaded(url){
            this.photoUrl = url
        },
        onAddRelevo(relevo){
            if(!this.newObj.relevos){
                this.newObj.relevos = []
            }
            this.newObj.relevos.push(relevo)
        }
    },
    components:{
        TransitoRegCard
    }
}
</script>
<style scoped>

.hide-amd{
    visibility: hidden;
}
.hover-control:hover .hide-amd {
    visibility: visible;
}
</style>