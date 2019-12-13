<template>
    <div class="text-gray-900 mt-4 tracking-wider leading-normal text-sm">
        <div class="text-left container w-full md:w-4/5 xl:w-3/5  mx-auto px-2">
                <div id='recipients' class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                    <table id="example" class="stripe hover w-full">
                        <thead>
                            <tr class="border-b border-grey-light">
                                <th data-priority="1">Cliente</th>
                                <th data-priority="2">Id Tarjeta</th>
                                <th data-priority="3">Observacion</th>
                                <th data-priority="4">Detalles</th>
                                <th data-priority="5">Fecha de validacion</th>
                                <th data-priority="6">Validador</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="my-row" v-for="(doc, index) in docs" :key="index">
                                <td class="py-2 px-2">
                                    <p v-if="!doc._cliente">
                                        cliente no encontrado
                                    </p>
                                    <p v-if="doc._cliente">
                                        {{doc._cliente.nombres}} {{doc._cliente.apellidoPaterno}} {{doc._cliente.apellidoMaterno}}
                                    </p>
                                    <p v-if="doc._cliente">
                                        {{doc._cliente.ci}}
                                    </p>
                                </td>
                                <td>
                                    <p v-if="!doc._cliente">
                                        cliente no encontrado
                                    </p>
                                    <p v-if="doc._cliente">
                                        {{doc._cliente.idTarjeta}}
                                    </p>
                                </td>
                                <td>{{doc.observaciones}}</td>
                                <td>
                                    <font-awesome-icon :class="[doc.botiquin?'text-green-300':'text-gray-300','ml-2']" icon="first-aid"/>
                                    <font-awesome-icon :class="[doc.extintor?'text-green-300':'text-gray-300','ml-2']" icon="fire-extinguisher"/>
                                    <font-awesome-icon :class="[doc.herramientas?'text-green-300':'text-gray-300','ml-2']" icon="tools"/>
                                    <font-awesome-icon :class="[doc.llantaAuxilio?'text-green-300':'text-gray-300','ml-2']" icon="cog"/>
                                    <font-awesome-icon :class="[doc.triangulo?'text-green-300':'text-gray-300','ml-2']" icon="exclamation-triangle"/>
                                    <font-awesome-icon :class="[doc.placasLaterales?'text-green-300':'text-gray-300','ml-2']" icon="ad"/>
                                </td>
                                <td>{{doc.fechaValidacion | fecha}}</td>
                                <td>
                                    <p v-if="!doc._validador">
                                        validador no encontrado
                                    </p>
                                    <p v-if="doc._validador">
                                        {{doc._validador.nombres}} {{doc._validador.apellidoPaterno}} {{doc._validador.apellidoMaterno}}
                                    </p>
                                    <p v-if="doc._validador">
                                        {{doc._validador.cargo}}
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <tfoot class="w-full px-1 pt-6 flex justify-between border-t border-grey-light">
                        <div class="">
                                Mostrando {{limit}} documentos de {{totalDocs}} registros
                        </div>
                        <div class="flex items-center">
                            <button :disabled="!hasPrevPage" @click="fetch(page-1)" class="font-bold mx-4">Previous</button>
                            <div>
                                <button :disabled="cpage === page" @click="fetch(cpage)" v-for="(cpage, index) in totalPages" :key="index" :class="[cpage === page?'bg-purple-600':'bg-purple-300','w-8', 'h-8', 'mx-1', 'cursor-pointer rounded','text-white']">
                                    {{cpage}}
                                </button>
                            </div>
                            <button :disabled="!hasNextPage" @click="fetch(page+1)" class="font-bold mx-4">Next</button>
                        </div>
                    </tfoot>
                    <p v-show="error" class="text-red-400 text-right mt-4">
                        {{error}}
                    </p>
                </div>
        </div>
   </div>
</template>
<script>
import { validaciones } from '@/services/validacion'
export default {
    data(){
        return{
            docs: [],
            totalDocs:null,
            limit:null,
            hasPrevPage:null,
            hasNextPage:null,
            page:null,
            totalPages:null,
            pagingCounter:null,
            prevPage:null,
            nextPage:null,
            isLoading: false,
            error: null
        }
    },
    methods: {
        async fetch(page = 1, limit = 10, query = {}) {
       
            try {
                this.isLoading = true
                const { data } = await validaciones({page,limit,query})
                this.docs = data.docs
                this.totalDocs = data.totalDocs
                this.limit = data.limit
                this.hasPrevPage = data.hasPrevPage
                this.hasNextPage = data.hasNextPage
                this.page = data.page
                this.totalPages = data.totalPages
                this.pagingCounter = data.pagingCounter
                this.prevPage = data.prevPage
                this.nextPage = data.nextPage
                this.isLoading = false

            } catch (error) {
                console.error(error)
                this.error = error
                this.isLoading = false
            }
        }
    },
    created() {
        this.fetch()
    }
}
</script>
<style scoped>
    .my-row:nth-child(odd){
        background-color: #f9f9f9;
    }
</style>