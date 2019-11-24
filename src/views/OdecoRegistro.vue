<template>
    <div class="w-full router-view-height flex items-center justify-center">
        <form class="bg-white shadow-md rounded-lg p-4 pt-8 max-w-2xl" @submit.prevent>
            <div>
                <div class="h-48 w-56 mx-auto mb-6">
                    <image-uploader :editable="editable" key="userPicture" title="user"  @onImageUploaded="getUrl"></image-uploader>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="nombres">
                        Objeto
                    </label>
                    <input :readonly="!editable" v-model="objeto" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="nombres" type="text">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="nombres">
                        Detalle
                    </label>
                    <input :readonly="!editable" v-model="detalles" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="nombres" type="text">
                </div>

            </div>
            <div class="block text-right pt-2">
                
                <button @click="registrar" class="mb-8 px-6 py-1 text-sm border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600" type="button">
                    Registrar
                </button>
                <p v-show="error" class="text-red-600">{{error}}</p>
            </div>
        </form>
    </div>
</template>
<script>
import ImageUploader from '@/components/ImageUploader'
import { registrarObjeto } from '@/services/objetos'
export default {
   data(){
       return {
           editable: true,
           isLoading: false,
           error: null,
           imgUrl: null,
           objeto: null,
           detalles: null

       }
   },
   methods: {
       async registrar(){
            this.error = null
           try {
                this.isLoading = true
                let datos = {
                    urlImagen: this.imgUrl,
                    objeto: this.objeto,
                    detalles: this.detalles
                }
                await registrarObjeto(datos)
                     this.$notify({
                        group:'alert',
                        title:'Objeto registrado',
                        text: `Objeto: ${this.objeto}`,
                        type:'success',
                        position: 'top left'
                    })
                this.imgUrl = null
                this.objeto = null
                this.detalles = null
                this.isLoading = false
           } catch (error) {
                console.error(error)
                this.error = error
                this.isLoading = false
           }
       },
       getUrl(url){
          this.imgUrl = url
       }
   },
   components:{
       ImageUploader
   }
}
</script>