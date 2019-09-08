<template>
    <div class="w-full max-w-4xl bg-white rounded-lg p-4 shadow-xl select-none">
        <warning-icon v-if="typeof(objValue) === 'undefined' || objValue === null" message="[objValue] property is null or undefined"/>
    <div v-else>
        <div class="flex text-left">
            <div class="w-1/3 flex items-center justify-center pb-2">
                <img class="h-40 object-cover" src="../assets/images/default_user.png" alt="">
            </div>

            <div class="w-1/3 p-2">
                <div class="mb-6">

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="idTarjeta">
                                Id. Tarjeta
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.idTarjeta" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="idTarjeta" type="text">
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="operador">
                                Operador
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.operador" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="operador" type="text">
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="ruta">
                                Ruta
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.ruta" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="ruta" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="horario">
                                Horarios
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.horario" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="horario" type="text">
                        </div>
                    </div>                   
                </div>
            </div>

            <div class="w-1/3 flex items-center justify-center pb-2">
                <img class="h-32 object-cover" src="../assets/images/vehiculos/minibus.png" alt="">
            </div>
        </div>
        <div class="flex">
            <div class="w-1/3">
            
                <div class="mb-6">

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="appellido-paterno">
                                Ap. Paterno
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.apellidoPaterno" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="apellido-paterno" type="text">
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="leading-none block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="apellido-materno">
                                Ap. Materno
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.apellidoMaterno" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="apellido-materno" type="text">
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="nombres">
                                Nombre(s)
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.nombres" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="nombres" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="ci">
                                C.I.:
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.ci" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="ci" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="licencia">
                                Licencia
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.licencia" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="licencia" type="text">
                        </div>
                    </div>            
                </div>

            </div>
            <!-- bottom center content -->
            <div class="w-1/3 px-3 -mt-3">

                <div class="text-left mb-4">
                    <span class="text-gray-500 text-xs font-bold ml-2">Relevos:</span>
                    <ul class="text-gray-700 text-xs ml-1">
                        <li v-for="(chofer, index) in objValue.relevos" :key="index" class="mb-1 bg-gray-700 rounded-full w-full py-2 px-4 text-gray-200 leading-tight relative shadow-md">
                            <p class="font-semibold mr-2 text-left flex-auto">{{index+1}}. <span class="ml-2 text-gray-500 font-normal">{{chofer}}</span></p>
                            <div class="btn-margin h-6 w-6 rounded-full cursor-pointer top-0 bottom-0 right-0 flex items-center justify-center bg-gray-900 absolute">
                                <font-awesome-icon icon="times" class="fill-current opacity-75 text-sm" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <a href="#" class="inline-block text-xs px-4 py-2 leading-none border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600">Adicionar chofer de relevo</a>
                </div>

                <div class="mt-3 text-left">
                    <label class="block mb-2  text-left leading-none text-gray-500 text-xs font-bold" for="Observaciones">
                        Observaciones
                    </label>
                    <textarea :readonly="!editable" v-model="objValue.observaciones" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="Observaciones" id="Observaciones" cols="30" rows="2"></textarea>
                </div>
                

            </div>
            <!-- end bottom center content-->
            <div class="w-1/3">
            
                <div class="mb-6">

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="chasis">
                                Nro. Chasis
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.nroChasis" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="chasis" type="text">
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="placa">
                                Nro. Placa
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.nroPlaca" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="placa" type="text">
                        </div>
                    </div>

                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="modelo">
                                Modelo
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.modelo" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="modelo" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-2">
                        <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="capacidad">
                                Capacidad
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.capacidad" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="capacidad" type="text">
                        </div>
                    </div>
                    <div class="md:flex md:items-center mb-2">
                    <div class="md:w-1/3">
                            <label class="block leading-none text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="clase">
                                Clase
                            </label>
                        </div>
                        <div class="md:w-2/3">
                            <input :readonly="!editable" v-model="objValue.clase" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="clase" type="text">
                        </div>
                    </div>                   
                </div>            

            </div>
        </div> 
        <div class="text-right">
            <button @click="emitCancel" class="inline-block text-sm px-8 py-2 mr-4 leading-none border rounded-full text-white bg-purple-600 hover:border-transparent hover:text-purple-600 hover:border-purple-600 hover:bg-white mt-4 lg:mt-0">{{cancelText}}</button>
            <button @click="emitAcept" class="inline-block text-sm px-8 py-2 leading-none border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600 mt-4 lg:mt-0">{{nextText}}</button>
        </div>
        </div>
    </div>

</template>
<script>
import WarningIcon from '@/components/WarningIcon'
export default {
    /*data(){
        return {
            objValue:{
                idTarjeta:null,
                operador:null,
                ruta:null,
                horarios:null,
                apellidoPaterno:null,
                apellidoMaterno:null,
                nombres:null,
                ci:null,
                licencia:null,
                relevos:['amanda hayta'],
                observaciones:null,
                nroChasis:null,
                nroPlaca:null,
                modelo:null,
                capacidad:null,
                clase:'minibus'
            },
            editable: true,
            nextText:'Validar',
            cancelText:'Cancelar'
        }
    },*/
    props:{
        objValue: Object,
        editable:{
            type: Boolean,
            default: true
        },
        nextText: {
            type: String,
            default: 'Ok'
        },
        cancelText: {
            type: String,
            default: 'Cancel'
        }
    },
    methods:{
        emitCancel(){
            this.$emit('onCancel')
        },
        emitAcept(){
            this.$emit('onAcept')
        }
    },
    components:{
        WarningIcon
    }
}
</script>
<style scoped>
 .w-form-input{
     width: 200px;
 }
 .btn-margin{
     margin-top: 3px;
     margin-right: 4px;
 }   
</style>