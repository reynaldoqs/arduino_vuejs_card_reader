<template>
    <div class="w-full router-view-height pt-1 flex items-center justify-center">
    <form class="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 max-w-xs" @submit.prevent>
        <div class="mb-4 text-left">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="userName">
                Nombre(s)
            </label>
            <input v-model="nombres" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userName" type="text" placeholder="Nombre(s)">
        </div>
        <div class="mb-4 text-left">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="userEmail">
                Correo
            </label>
            <input v-model="email" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userEmail" type="text" placeholder="Email">
        </div>
        <div class="mb-4 text-left">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="userCI">
                Cedula de Identidad
            </label>
            <input v-model="ci" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userCI" type="text" placeholder="Ci">
        </div>
        <div class="mb-5 text-left">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Contraseña
            </label>
            <input @keyup.enter="onSigin" v-model="password" class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
            <p class="text-red-500 text-xs italic">{{error?error:''}}</p>
        </div>
        <div class="block text-left">
            <button @click="onSigin" class="w-full mb-8 p-1 border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600" type="button">
                Registrarse
            </button>

            <span class="text-xs text-gray-500 text-left">¿Olvidaste tu contraseña? </span>
            <router-link tag="a" to="/resetpasword" class="ml-2 font-bold text-xs text-purple-600 text-left hover:text-purple-800">
                Restablecer
            </router-link>
        </div>
    </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            nombres: '',
            email: '',
            password: '',
            ci: ''
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        },
        error(){
            return this.$store.getters.error
        }
    },
    methods: {
        onSigin(){
            this.$store.dispatch('signUserUp',{nombres:this.nombres, email:this.email, password:this.password, ci:this.ci})
        },
        onResetPassword() {
            if (this.email === '') {
            return this.$store.dispatch('setError', {message: 'Email can not be blank'})
            }
            this.$store.dispatch('resetPasswordWithEmail', {email: this.email})
        },
        onDismissed() {
            this.$store.dispatch('clearError')
        }
    }
}
</script>