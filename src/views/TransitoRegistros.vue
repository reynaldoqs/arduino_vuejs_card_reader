<template>
    <div class="router-view-height flex">
       <div class="router-view-height w-full flex justify-center py-4 px-2">
           <div class="w-full mb-16 max-w-6xl  bg-white rounded-lg shadow-xl select-none">
               <div class="flex py-4 px-6 rounded-t-lg justify-between bg-gray-100">
                   <div>Buscar</div>
                   <button @click="abrirAdicionar" class="inline-block text-sm px-8 py-2 mr-4 leading-none border rounded-full text-white bg-purple-600 hover:border-transparent hover:text-purple-600 hover:border-purple-600 hover:bg-white mt-4 lg:mt-0">Adicionar</button>
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
                            <img class="w-10 h-10 rounded-full object-cover" src="../assets/images/user_default.png" alt="">
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
       <modal :width="896" :height="472"  name="create-card">
        <transito-reg-card v-on:onCancel="cancelar()" v-on:onAcept="adicionar()" :objValue="newObj" :editable="true"></transito-reg-card>
        </modal>
    </div>
</template>
<script>

import TransitoRegCard from '@/components/TransitoRegCard'

import {transaccionesDB} from '@/firebaseDB'

export default {
    data() {
        return{
            isAlive:true,
            newObj:{},
            editable: true,
            nextText:'Aceptar',
            cancelText:'Cancelar',
            transacciones:[],
            oldId:null
        }
    },
    firebase: {
        transacciones: transaccionesDB,
    },
    methods:{
        abrirAdicionar(){
            this.$modal.show('create-card');
        },
        adicionar(){
            //mejorar esta parte: verificar si se modifico el idTarjeta
            //para luego borrar el documento anterior con el atiguo id
            if(this.newObj.idTarjeta){
                let objId = this.newObj.idTarjeta;
                transaccionesDB.child(objId).update(this.newObj).then(()=>{
                    this.newObj = {}
                    this.$modal.hide('create-card');
                    if(this.oldId && this.oldId !== objId){
                        transaccionesDB.child(this.oldId).remove();
                        this.oldId = null
                    }
                })
                
            }else{
                alert("El id tarjeta es necesario");
            }
        },
        eliminar(obj){
            if (confirm("Eliminar el elemento?")) {
                let objId = obj.idTarjeta
                transaccionesDB.child(objId).remove();
            }
        },
        modificar(obj){
            this.newObj = {...obj}
            this.oldId = obj.idTarjeta
            this.$modal.show('create-card');
        },
        cancelar(){
            this.newObj = {}
            this.$modal.hide('create-card');
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