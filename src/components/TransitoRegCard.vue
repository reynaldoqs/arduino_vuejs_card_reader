<template>
    <div class="main-container bg-white rounded-lg p-4 shadow-xl">
        <warning-icon class="mx-auto" v-if="!objValue" message="[objValue] property is null or undefined"/>
    <div v-else>
        <div class="flex text-left">
            <div class="w-1/3 flex items-center justify-center pb-2">
                <div class="h-40 w-40">
                    <image-uploader :editable="editable" key="userPicture" title="user" :oldPictureUrl="objValue.photoUrl" @onImageUploaded="onImageUploaded"></image-uploader>
                </div>
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
                            <input :readonly="!editable" v-model.number="objValue.idTarjeta" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="idTarjeta" type="text">
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
                <div class="h-40 w-40">
                   <!--<img class="h-40 w-40 object-cover select-none" draggable="false" :src="carUrl" alt="automovil">-->
                    <image-uploader-two  :editable="editable"  key="carPictgure" title="car" :oldPictureUrl="objValue.carPhotoUrl" @onCarImageUploaded="onCarImageUploaded"></image-uploader-two>
                </div>
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
                    <span v-show="objValue.relevos?objValue.relevos.length > 0 : false" class="text-gray-500 text-xs font-bold ml-2">Relevos:</span>
                    <ul v-if="objValue.relevos?objValue.relevos.length > 0 : false" class="text-gray-700 text-xs ml-1">
                        <li v-for="(relevo, index) in relevos" :key="index" class="mb-1 bg-gray-700 rounded-full w-full py-1 px-4 text-gray-200 leading-tight relative shadow-md">
                            <p class="font-semibold mr-2 text-left flex-auto">{{index+1}}. <span class="ml-2 text-gray-500 font-normal">{{relevo.chofer}}</span></p>
                            <div @click="onRemoveRelevo(relevo)" class="btn-margin h-4 w-4 rounded-full cursor-pointer top-0 bottom-0 right-0 flex items-center justify-center bg-gray-900 absolute">
                                <font-awesome-icon icon="times" class="fill-current opacity-75 text-sm" />
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="!isValidate" class="flex">
                    <input :readonly="!editable" v-model="relevo.chofer" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="relevo" type="text">
                    <button @click="onAddRelevo" class="inline-block text-xs font-bold w-20 h-8 ml-2 leading-none border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600">añadir</button>
                </div>

                <div class="mt-3 text-left">
                    <label class="block mb-2  text-left leading-none text-gray-500 text-xs font-bold" for="Observaciones">
                        Observaciones
                    </label>
                    <textarea v-model="objValue.observaciones" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" name="Observaciones" id="Observaciones" cols="30" rows="2"></textarea>
                </div>
                
                <div v-if="isValidate" class="flex">
                    <div class="w-1/2">
                        <my-check-box v-model="objValue.placasLaterales" label="Placas laterales"/>
                        <my-check-box v-model="objValue.botiquin" label="Botiquin"/>
                        <my-check-box v-model="objValue.extintor" label="Extintor"/>
                        
                    </div>
                    <div class="w-1/2">
                        
                        <my-check-box v-model="objValue.llantaAuxilio" label="Llanta de auxilio"/>
                        <my-check-box v-model="objValue.triangulo" label="Triangulo"/>
                        <my-check-box v-model="objValue.herramientas" label="Herramientas"/>
                    </div>
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
        <div class="text-right relative">
            <div v-if="isValidate" class="absolute left-0 top-0 p-2 pt-4 leading-none text-gray-700 text-sm font-bold">
                    Crédito: {{objValue.credito}} BS
                <span class="ml-10 text-red-400" v-show="!objValue.estado">
                    El usuario no tiene el registro de retorno.
                </span>
            </div>
            <button @click="emitCancel" class="inline-block text-sm px-8 py-2 mr-4 leading-none border rounded-full text-white bg-purple-600 hover:border-transparent hover:text-purple-600 hover:border-purple-600 hover:bg-white mt-4 lg:mt-0">{{cancelText}}</button>
            <button @click="emitAcept" v-show="!isValidate || objValue.estado"  class="inline-block text-sm px-8 py-2 leading-none border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600 mt-4 lg:mt-0">{{nextText}}</button>
        </div>
        </div>
    </div>

</template>
<script>
import WarningIcon from '@/components/WarningIcon'
import ImageUploader from '@/components/ImageUploader'
import ImageUploaderTwo from '@/components/ImageUploaderTwo'
import MyCheckBox from '@/components/MyCheckBox'
export default {
    data(){
        return {
            relevo:{}
        }
    },
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
        },
        isValidate: {
            type: Boolean,
            default: false
        }
    },
    computed:{
        relevos(){
            if(this.objValue.relevos){
                return this.objValue.relevos
            }
            return []
        },
        carUrl(){
            //let url = this.objValue.carPhotoUrl
            let url = this.objValue.clase
            if(url){
                switch (url.toLowerCase()) {
                    case 'minibus':
                        return require('../assets/images/vehiculos/minibus.jpg')
                    case 'bus':
                        return require('../assets/images/vehiculos/bus.jpg')
                    case 'taxi':
                        return require('../assets/images/vehiculos/taxi.jpg')
                    default:
                        return require('../assets/images/vehiculos/default_car.png')
                }
            }
            return require('../assets/images/vehiculos/default_car.png')
        }
    },
    methods:{
        emitCancel(){
            this.$emit('onCancel')
        },
        emitAcept(){
            this.$emit('onAcept')
        },
        onImageUploaded(url) {
            this.$emit('onImageUploaded',url)
        },
        onCarImageUploaded(url) {
            this.$emit('onCarImageUploaded',url)
        },
        onAddRelevo(){
             if(!this.objValue.relevos){
                this.objValue.relevos = []
            }
            this.objValue.relevos.push(this.relevo)
            this.relevo = {}
        },
        onRemoveRelevo(relevo){
            if(this.objValue.relevos){
                let index = this.objValue.relevos.findIndex(x => x.chofer === relevo.chofer)
                if(index !== -1){
                    this.objValue.relevos.splice(index,1)       
                }
            }
        }
    },
    components:{
        WarningIcon,
        ImageUploader,
        MyCheckBox,
        ImageUploaderTwo
    }
}
</script>
<style scoped>
 .w-form-input{
     width: 180px;
 }
 .btn-margin{
     margin-top: 3px;
     margin-right: 4px;
 } 
 .main-container{
     width: 800px;
     min-width: 800px;
     max-width: 800px;
 }  
</style>