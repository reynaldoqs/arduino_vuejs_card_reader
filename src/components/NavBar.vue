<template>
    <nav class="flex items-center justify-between flex-wrap bg-white p-4 shadow-md">
        <div class="flex items-center flex-shrink-0 text-purple mr-6">
            <img class="h-6" src="../assets/images/interprovincial.png">
        </div>
        <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
                <router-link tag="a" to="/home" class="block mt-4 lg:inline-block lg:mt-0 text-purple-600 hover:text-black mr-4">Home</router-link>
                <router-link tag="a" to="/signin" class="block mt-4 lg:inline-block lg:mt-0 text-purple-600 hover:text-black mr-4">Sign in</router-link>
                <router-link tag="a" to="/signup" class="block mt-4 lg:inline-block lg:mt-0 text-purple-600 hover:text-black mr-4">Sign up</router-link>
                <router-link tag="a" to="/transito-registros" class="block mt-4 lg:inline-block lg:mt-0 text-purple-600 hover:text-black mr-4">Transito Registros</router-link>
                <router-link tag="a" to="/transito" class="block mt-4 lg:inline-block lg:mt-0 text-purple-600 hover:text-black">Transito Validacion</router-link>
            </div>
            <div v-if="user" class="flex items-center">
                <div class="flex items-center mr-3">
                    <div class="text-xs text-right mr-2 leading-none">
                        <p class="text-gray-900">{{user.name}}</p>
                        <p class="text-gray-400">{{user.email}}</p>
                    </div>
                    <img class="w-8 h-8 rounded-full" :src="user.photoUrl" alt="User photo">
                </div>
                <a href="#" @click="logout" class="inline-block text-sm px-4 py-2 leading-none border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600 mt-4 lg:mt-0">Log out</a>
            </div>
            <div v-else class="flex items-center">
                <router-link tag="a" to="/signin" class="inline-block text-sm px-4 py-2 leading-none border rounded-full text-purple-600 border-purple-600 hover:border-transparent hover:text-white hover:bg-purple-600 mt-4 lg:mt-0">Sign in</router-link>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout');
        }
    }
}
</script>