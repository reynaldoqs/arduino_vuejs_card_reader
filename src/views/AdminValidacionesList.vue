<template>
    <div class="text-gray-900 mt-4 tracking-wider leading-normal text-sm">
        <div class="text-left container w-full md:w-4/5 xl:w-3/5  mx-auto px-2">
                <div id='recipients' class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                    <table id="example" class="stripe hover w-full">
                        <thead>
                            <tr class="border-b border-grey-light">
                                <th data-priority="1">Usuario</th>
                                <th data-priority="2">Observacion</th>
                                <th data-priority="3">Detalles</th>
                                <th data-priority="4">Fecha de validacion</th>
                                <th data-priority="5">Validador</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="my-row" v-for="(doc, index) in docs" :key="index">
                                <td class="py-2 px-2">
                                    <p>
                                        {{doc.usuario.nombres}} {{doc.usuario.apellidoPaterno}} {{doc.usuario.apellidoMaterno}}
                                    </p>
                                    <p>
                                        {{doc.usuario.ci}}
                                    </p>
                                </td>
                                <td>{{doc.observacion}}</td>
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
                                    <p>
                                        {{doc._validador.nombres}}
                                    </p>
                                    <p>
                                        {{doc._validador.email}}
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
                            <p class="font-bold mx-4">Previous</p>
                            <div>
                                <button v-for="(cpage, index) in totalPages" :key="index" :class="[cpage === page?'bg-purple-600':'bg-purple-300','w-8', 'h-8', 'mx-1', 'cursor-pointer rounded','text-white']">
                                    {{cpage}}
                                </button>
                            </div>
                            <p class="font-bold mx-4">Next</p>
                        </div>
                    </tfoot>
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
            isLoading: false
        }
    },
    methods: {
        async fetch() {
            try {
                this.isLoading = true
                const { data } = await validaciones({limit:12,page:1})
                console.log(data)
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
                console.log(error)
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