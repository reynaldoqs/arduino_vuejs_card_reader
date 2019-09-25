<template>
    <div class="w-full router-view-height flex items-center justify-center">
    <form class="bg-white shadow-md rounded-lg pl-8 pr-8 pt-10 max-w-2xl" @submit.prevent>
        <div class="flex">
        <div class="mr-3">

            <div class="mb-4">
                <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="nombres">
                    Nombre(s)
                </label>
                <input :readonly="!editable" v-model="nombres" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="nombres" type="text">
            </div>

            <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="apPaterno">
                        Apellido Paterno
                    </label>
                    <input :readonly="!editable" v-model="apellidoPaterno" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="apPaterno" type="text">
            </div>

            <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="apMaterno">
                        Apellido Materno
                    </label>
                    <input :readonly="!editable" v-model="apellidoMaterno" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="apMaterno" type="text">
            </div>

            <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="ci">
                        Cedula de Identidad
                    </label>
                    <input :readonly="!editable" v-model="ci" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="ci" type="text">

            </div>

        </div>

        <div class="ml-3">

            <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="email">
                        Correo Electronico
                    </label>
                    <input :readonly="!editable" v-model="email" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="email" type="text">
                
            </div>

            <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="ci">
                        Numero de Celular
                    </label>
                    <input :readonly="!editable" v-model.number="celular" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="celular" type="text">
            
            </div>

            <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="cargo">
                        Cargo
                    </label>
                <select v-model="cargo" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="cargo">
                    <option v-for="(cargo,index) in cargos" v-bind:key="index" v-bind:value="cargo">
                        <span >{{index+1}}</span> - {{cargo}}
                    </option>
                </select>
            </div>

            <div class="mb-4">
                    <label class="block text-gray-500 text-xs font-bold md:text-right mb-1 md:mb-0 pr-4" for="password">
                        Contraseña
                    </label>
                    <input :readonly="!editable" @keyup.enter="onSigin" v-model="password" class="w-form-input bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password">
              
            </div>
        </div>
        </div>
        <div class="block text-right pt-2">
            <p v-show="error" class="text-red-600">{{error}}</p>
            <button @click="onSigin" class="mb-8 px-6 py-1 text-sm border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600" type="button">
                Registrar
            </button>
        </div>
    </form>
    </div>
</template>
<script>
import { userSignUp } from '@/services/auth'
export default {
    data(){
        return {
            editable: true,
            error:null,
            isLoading: false,

            nombres: null,
            apellidoPaterno: null,
            apellidoMaterno: null,
            ci: null,
            email: null,
            celular: null,
            cargo: null,
            password: null,
            cargos: ['administrador', 'transito-validador', 'transito-administrador', 'cajero', 'odeco', 'observador']
        }
    },
    methods: {
        async onSigin(){
            try {
                this.isLoading = true
                const datos = {nombres:this.nombres, apellidoPaterno: this.apellidoPaterno, apellidoMaterno: this.apellidoMaterno, ci:this.ci, email:this.email, celular: this.celular, cargo: this.cargo, password: this.password}
                await userSignUp(datos)
                this.nombres = null
                this.apellidoPaterno = null
                this.apellidoMaterno = null
                this.ci = null
                this.email = null
                this.celular = null
                this.cargo = null
                this.password = null
                this.isLoading = false 
                this.$router.push('/home')
            } catch (error) {
                console.error(error)
                this.error = error
                this.isLoading = false
            }
        },
        onDismissed() {
            this.$store.dispatch('clearError')
        }
    }
}
</script>