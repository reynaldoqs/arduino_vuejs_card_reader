<template>
    <div class="w-full router-view-height pt-1 flex items-center justify-center">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 max-w-xs" @submit.prevent>
        <div class="mb-4 text-left">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="userEmail">
                Email
            </label>
            <input class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userEmail" type="text" placeholder="User Email">
        </div>
        <div class="mb-5 text-left">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Contraseña
            </label>
            <input class="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
            <p class="text-red-500 text-xs italic">{{error?error:''}}</p>
        </div>
        <div class="block text-left">
            <button @click="onSigin" class="w-full mb-8 p-1 border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600" type="button">
                Ingresar
            </button>
            <span class="text-xs text-gray-500 text-left">Entrar con:</span>
            <button @click="onSigninGoogle" class="w-full mt-2 bg-red-500 px-3 py-1 rounded-full focus:outline-none focus:shadow-outline">
                <span class="text-white text-xs">Google</span><font-awesome-icon :icon="['fab', 'google']" class="ml-2 text-xs text-white"/>
            </button>
            <button @click="onSigninFacebook" class="w-full mt-3 mb-4 bg-blue-700 px-3 py-1 rounded-full focus:outline-none focus:shadow-outline">
                <span class="text-white text-xs">Facebook</span><font-awesome-icon :icon="['fab', 'facebook-f']" class="ml-2 text-xs text-white"/>
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
            email: '',
            password: ''
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
            if(this.email !== '' && this.password !== ''){
                this.$store.dispatch('signUserIn',{email:this.email, password:this.password})
            }
        },
        onSigninGoogle() {
        this.$store.dispatch('signUserInGoogle')
        },
        onSigninFacebook() {
            this.$store.dispatch('signUserInFacebook')
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