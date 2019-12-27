<template>
<div class="pt-5 text-gray-900 tracking-wider leading-normal overflow-y-auto router-view-height">
    <div class="text-left container w-full md:w-4/5 xl:w-3/5  mx-auto px-2">
    
        <div id='recipients' class="p-4 mt-6 lg:mt-0 rounded shadow bg-white">
            <div class="flex items-center flex-col border-b border-b-2 border-teal-500 py-2 pb-6">
                <h3 class="font-bold">Seleccionar rango del reporte</h3>
                <date-picker class="mx-auto mt-4" v-model="rango" type="date" :lang="lang" range placeholder="Seleccionar rango"></date-picker>
            </div>
            <div class="flex items-center justify-center border-b border-b-2 border-teal-500 py-4 mb-4">
               <div class="mx-6 p-2 text-center">
                   <h3 class="font-bold border-b-2 border-black mb-2">Total recargas</h3>
                   <p>{{totalCredito}} Bs</p>
               </div>
               <div class="mx-6 p-2 text-center">
                   <h3 class="font-bold border-b-2 border-black mb-2">Total usuarios</h3>
                   <p>{{totalCreditoRestante.length}}</p>
               </div>
            </div>
            <table id="example" class="stripe hover w-full">
                <thead>
                    <tr class="border-b border-grey-light">
                        <th data-priority="1">Cliente</th>
                        <th data-priority="2">Monto de Recarga</th>
                        <th data-priority="3">Credito Total</th>
                        <th data-priority="5">Fecha de Recarga</th>
                        <th data-priority="6">Cajero</th>
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
                        <td>{{doc.montoRecarga}} Bs</td>
                        <td>
                            <p v-if="!doc._cliente">
                                cliente no encontrado
                            </p>
                            <p v-if="doc._cliente">
                                {{doc._cliente.credito}} Bs
                            </p>
                        </td>
                        <td>{{doc.fechaRecarga | fecha}}</td>
                        <td>
                            <p v-if="!doc._cajero">
                                cajero no encontrado
                            </p>
                            <p v-if="doc._cajero">
                                {{doc._cajero.nombres}} {{doc._cajero.apellidoPaterno}} {{doc._cajero.apellidoMaterno}}
                            </p>
                            <p v-if="doc._cajero">
                                {{doc._cajero.cargo}}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--<tfoot class="w-full px-1 pt-6 flex justify-between border-t border-grey-light">
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
            </tfoot>-->
            <p v-show="error" class="text-red-400 text-right mt-4">
                {{error}}
            </p>
        </div>
    </div>
</div>
</template>

<script>
import {
    reportes
} from '@/services/reportes'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import 'vue2-datepicker/locale/es';
export default {
    data() {
        return {
            docs: [],
            totalDocs: null,
            limit: null,
            hasPrevPage: null,
            hasNextPage: null,
            page: null,
            totalPages: null,
            pagingCounter: null,
            prevPage: null,
            nextPage: null,
            isLoading: false,
            error: null,
            query: null,
            rango:[],
            totalCredito: null,
            totalCreditoRestante: 0,
            lang: {
            formatLocale: {
                firstDayOfWeek: 1,
            },
            monthBeforeYear: false,
            }
        }
    },
    watch: {
      rango() {

          this.getReporte()
      }  
    },
    methods: {
        getReporte(){
            const inicio = this.rango[0]
            const final = this.rango[1]
            this.fetch(1,9999,inicio,final)
        },
        async fetch(page = 1, limit = 9999, inicio, final = new Date()) {
            try {
                this.isLoading = true
                const {
                    data
                } = await reportes({
                    page,
                    limit,
                    inicio,
                    final
                })
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

                this.totalCredito = this.docs.reduce((cont, item) => cont+item.montoRecarga, 0);
                let unique = [...new Set(this.docs.filter(x=> x._cliente).map(x=> x._cliente.ci))]
    
                this.totalCreditoRestante = unique
                
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
    },
    components: {
        DatePicker
    }
}
</script>

<style scoped>
.my-row:nth-child(odd) {
    background-color: #f9f9f9;
}
</style>
