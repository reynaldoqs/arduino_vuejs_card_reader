<template>
    <div class="router-view-height flex">
       <div class="router-view-height activity-navbar pt-3 md:block hidden bg-gray-900">
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
       <div class="router-view-height activity-container flex justify-center items-center">
           <div class="mb-16">
                <div v-if="currentTransaction" >
                   <transito-reg-card :isValidate="true" nextText="Validar" v-on:onCancel="cancelar()" v-on:onAcept="validar()" :objValue="currentTransaction" :editable="false"></transito-reg-card>
                </div>
                <warning-icon v-else message="No existe actividad, seleccione a un usuario para validar"></warning-icon>
           </div>  
       </div>

    </div>
</template>
<script>
import ValidacionesList from '@/components/ValidacionesList'
import WarningIcon from '@/components/WarningIcon'
import TransitoRegCard from '@/components/TransitoRegCard'
import { updateCliente } from '@/services/clientes'
import { validate } from '@/services/validacion'

export default {
    data() {
        return{
            currentTransaction: null,
            isLoading: false
        }
    },
    sockets: {
        validacion: function(data){
            if(data){
                const newData = {
                    ...data,
                    type:'validacion'
                }
                this.$store.dispatch('addTransaction',newData)
                this.$notify({
                    group: 'foo',
                    data: newData
                });
            }
        },
        descuento: function(data){
            if(data){
                const newData = {
                    ...data,
                    type:'descuento'
                }
                this.$store.dispatch('addTransaction',newData)
                /*this.$notify({
                    group: 'foo',
                    data: newData
                });*/
            }
        }
    },
    computed:{
        selectedTransaction(){
             return this.$store.getters.selectedTransaction
        }
    },
    watch:{
       selectedTransaction(newVal, oldVal){
           console.log(`Updating from ${oldVal} to ${newVal}`);
            if(newVal){
                this.currentTransaction = {...newVal}
            }else{
                this.currentTransaction = null
            }
       } 
    },
    methods:{
        notificar(){
            console.log(' no nada')
        },
        async validar(){
            try {
                this.isLoading = true
                const {_id, observaciones, botiquin,
                extintor, triangulo, placasLaterales,
                llantaAuxilio, herramientas} = this.currentTransaction
                
                const validation = {
                    _cliente:_id,
                    observaciones:observaciones? observaciones: null,
                    botiquin:botiquin? botiquin:false,
                    extintor:extintor? extintor:false,
                    triangulo:triangulo? triangulo:false,
                    placasLaterales:placasLaterales? placasLaterales:false,
                    llantaAuxilio:llantaAuxilio?llantaAuxilio:false,
                    herramientas:herramientas?herramientas:false
                }
                await validate(validation)
                await updateCliente(_id,{observaciones:observaciones})
                this.cancelar()
                this.isLoading = false

            console.log(validation)
            } catch (error) {
                this.isLoading = false
                console.error(error)
            }

        },
        cancelar(){
            this.currentTransaction = null
            this.$store.dispatch('clearTransaction')
        }
    },
    created(){
        if(this.$store.getters.selectedTransaction){
            this.currentTransaction = {...this.$store.getters.selectedTransaction}
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
.activity-navbar{
    width: var(--left-navbar);
}
.activity-container{
    width: calc(100% - var(--left-navbar));
}
</style>