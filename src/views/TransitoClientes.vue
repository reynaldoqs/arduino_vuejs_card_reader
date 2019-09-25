<template>
    <div class="text-gray-900 mt-4 tracking-wider leading-normal text-sm">
        <div class="text-left container w-full md:w-4/5 xl:w-3/5  mx-auto px-2">
                <div id='recipients' class="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
                    <table id="example" class="stripe hover w-full">
                        <thead>
                            <tr class="border-b border-grey-light">
                                <th data-priority="1">Foto</th>
                                <th data-priority="2">Cliente</th>
                                <th data-priority="3">Id Tarjeta</th>
                                <th data-priority="4">Saldo</th>
                                <th data-priority="5">Vehiculo</th>
                                <th data-priority="6">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="my-row" v-for="(doc, index) in docs" :key="index">
                                <td>
                                    <img class="ml-2 rounded-full w-10 h-10 object-cover" :src="doc.photoUrl" alt="cliente">
                                </td>
                                <td class="py-2 px-2">
                                    <p>
                                        {{doc.nombres}} {{doc.apellidoPaterno}} {{doc.apellidoMaterno}}
                                    </p>
                                    <p>
                                        {{doc.ci}}
                                    </p>
                                </td>
                                <td>{{doc.idTarjeta}}</td>
                                <td>{{doc.credito}} Bs </td>
                                <td class="py-2 px-2">
                                    <p>
                                        {{doc.clase}}
                                    </p>
                                    <p>
                                        {{doc.nroPlaca}}
                                    </p>
                                </td>
                                <td>
                                    <button @click="remove(doc.email)" class="text-red-400 cursor-pointer py-1 px-2">
                                        <font-awesome-icon  icon="trash"/> 
                                    </button>   
                                    <button @click="remove(doc.email)" class="text-orange-400 cursor-pointer py-1 px-2">
                                        <font-awesome-icon  icon="user-edit"/> 
                                    </button>                             
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
import { getClientes } from '@/services/clientes'
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
                const { data } = await getClientes({page,limit,query})
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
        },
        async remove(email){
            try {
                this.isLoading = true
                if (confirm("Eliminar el elemento?")) {
                    //await crear eliminar clientes
                    let index = this.docs.findIndex(x => x.email === email)
                    if(index !== -1) this.docs.splice(index,1)
                }
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