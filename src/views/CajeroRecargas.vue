<template>
  <div class="w-full router-view-height flex items-center justify-center">
    
    <div class="max-w-2xl pt-6 mx-auto bg-white rounded-lg shadow-xl">

      <div class="flex flex-wrap p-1">

        <div class="w-full md:w-2/4 p-4 text-center text-gray-200">
          <div class="relative">

            <model-list-select
                    :list="docs"
                    v-model="objectItem"
                    option-value="idTarjeta"
                    :custom-text="codeAndNameAndDesc"
                    placeholder="Seleccionar cliente">
            </model-list-select>
          </div>
            <form class="w-full mt-10 mx-auto max-w-sm p-1" v-on:submit.prevent>
              <div class="mb-6">
                  <label class="block text-gray-500 font-bold text-sm md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Monto
                  </label>
                  <input @keyup.enter="recharge" type="text" v-model.number="montoRecarga" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500" id="inline-full-name"  value="12">
              </div>
            </form>


        </div>

        <div class="w-full md:w-2/4 p-4 text-center text-gray-700">
            <div v-if="objectItem.nombres">
              <img class="w-32 h-32 mx-auto rounded-full bg-gray-700 object-cover" :src="objectItem.photoUrl" />
              <div class="w-32 mt-3  mx-auto font-bold text-sm">
                {{objectItem.nombres}} {{objectItem.apellidoPaterno}} {{objectItem.apellidoMaterno}}
              </div>
            </div>
            <warning-icon v-else message="Seleccione un cliente para continuar"/>
        </div>
      </div>
      <button @click="recharge" class="mb-8 px-6 py-1 text-sm border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600" type="button">
        Recargar
      </button>
      <p v-show="error" class="text-red-400 text-right mt-4 pb-3 pr-4">
        {{error}}
      </p>
    </div>
  </div>
</template>
<script>
import { ModelListSelect } from 'vue-search-select'
import WarningIcon from '@/components/WarningIcon'
import { getClientes } from '@/services/clientes'
import { recargar } from '@/services/recargas'

export default {
  name: 'recargas',
  data(){
    return {
        docs: [],
        montoRecarga: null,
        objectItem: {},
        totalDocs: null,
        isLoading: false,
        error: null
    }
  },
  methods: {
    codeAndNameAndDesc (item) {
        return `${item.idTarjeta} - ${item.nombres} ${item.apellidoPaterno} ${item.apellidoMaterno} `
    },
    async recharge(){
      if(this.objectItem._id && this.montoRecarga > 0){
        try {
          this.isLoading = true
          const datos = {
            montoRecarga: this.montoRecarga,
            _cliente: this.objectItem._id
          }
          await recargar(datos)
          this.montoRecarga = null
          this.objectItem = {}
          this.isLoading = false

        } catch (error) {
          console.error(error)
          this.error = error
          this.isLoading = false
        }
      }
    },
    async fetch(page = 1, limit = 10, query = {}) {
      try {
          this.isLoading = true
          const { data } = await getClientes({page,limit,query})
          this.docs = data.docs
          this.totalDocs = data.totalDocs
          this.isLoading = false

          } catch (error) {
              console.error(error)
              this.error = error
              this.isLoading = false

          }
    },
  },
  created() {
    //999 usuarios
    this.fetch(1,999)
  },
  components: {
    ModelListSelect,
    WarningIcon
  }
}
</script>