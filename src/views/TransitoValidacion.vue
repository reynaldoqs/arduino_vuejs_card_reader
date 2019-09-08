<template>
    <div class="router-view-height flex">
       <div class="router-view-height pt-3 w-full lg:w-1/4 lg:block xl:w-1/5 hidden bg-gray-900">
            <ul class="flex border-b border-gray-700">
                <li class="-mb-px mr-1 ml-2">
                    <a class="bg-gray-900 inline-block border-gray-700 border-l border-t border-r rounded-t py-3 px-4 text-gray-500 font-semibold text-sm" href="#">Validaciones</a>
                </li>
                <li class="mr-1">
                    <a @click="notificar()" class="inline-block py-3 px-4 text-gray-600 hover:text-purple-600 font-semibold text-sm" href="#">Partidas</a>
                </li>
            </ul>
            <div class="bg-gray-900">
                <validaciones-list></validaciones-list>
            </div>
       </div>
       <div class="router-view-height w-full lg:w-3/4 xl:w-4/5 flex justify-center items-center">
           <div class="mb-16">
            <transito-reg-card v-if="selectedTransaction" v-on:onCancel="cancelar()" v-on:onAcept="validar()" :objValue="selectedTransaction" :editable="false"></transito-reg-card>
            <warning-icon v-else message="No existe actividad, seleccione a un usuario para validar"></warning-icon>
           </div>  
       </div>
       <notifications group="foo" position="bottom right" :duration="15000">
           <template slot="body" slot-scope="props">
            <div @click="() => {$store.dispatch('selectTransaction', props.item.data)}" class="bg-white rounded shadow-2xl  mb-2 mr-4 cursor-pointer">
                <a class="title">
                </a>
                <a class="close">
                <i class="fa fa-fw fa-close"></i>
                </a>
                <div class="flex">
                    <img class="h-20 w-20 rounded-l" src="../assets/images/default_user.png" alt="usuario">
                    <div class="p-2 flex  w-full items-center">
                        <div class="w-full text-left">
                        <p class="font-bold text-sm">
                            {{props.item.data.nombres}} {{props.item.data.apellidoPaterno}}
                        </p>
                        <div class="flex justify-between">
                            <p class="text-sm text-gray-500 leading-none">{{props.item.data.nroPlaca}}</p>
                            <p class="text-xs text-gray-600">{{props.item.data.type?'partida':'control'}}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
       </notifications>
    </div>
</template>
<script>
import ValidacionesList from '@/components/ValidacionesList'
import WarningIcon from '@/components/WarningIcon'
import TransitoRegCard from '@/components/TransitoRegCard'

import {transaccionesDB} from '@/firebaseDB'

export default {
    data() {
        return{
            transacciones:[]
        }
    },
    firebase: {
        transacciones: transaccionesDB,
    },
    computed:{
        selectedTransaction(){
            return this.$store.getters.selectedTransaction
        }
    },
    methods:{
        notificar(){
            console.log(' no nada')
        },
        validar(){
            if(this.objValue){
                let objId = this.objValue.idTarjeta;

                transaccionesDB.child(objId).update(this.objValue).then(()=>{
                    console.log('objt was create or updated')
                })
                
            }else{
                console.log('null or undefined object')
            }
        },
        cancelar(){
            console.log('vamos a cancelar')
        }
    },
    components:{
        ValidacionesList,
        WarningIcon,
        TransitoRegCard
    }
}
</script>
<style scoped>
.l-bar{
    width: 300px;
}
</style>