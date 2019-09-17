<template>
    <nav class="flex items-center justify-between bg-gray-900 p-4 shadow-md">
        <div class="flex items-center flex-shrink-0 text-purple mr-6">
            <img class="h-6" src="../assets/images/interprovincial.png">
        </div>
        <!--
            <div class="block lg:hidden">
            <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        -->
        <div>
            <!--
            <div class="text-sm lg:flex-grow">
                <router-link v-for="(nav, index) in navElements" :key="index" tag="a" :to="nav.path" class="block mt-4 mx-2 lg:inline-block lg:mt-0 text-gray-300 hover:text-white">{{nav.title}}</router-link>
            </div>
            -->
            <div v-if="user" class="flex items-center">
                <div class="flex items-center mr-3">
                    <div class="text-xs text-right mr-2 leading-tight">
                        <p class="text-gray-300">{{user.email}}</p>
                        <p class="text-gray-600 font-bold">{{user.cargo}}</p>
                    </div>
                    <img src="../assets/images/avatar.png" class="rounded-full object-cover h-8 w-8 bg-gray-500"/>
                </div>
                <a @click="logout" class="inline-block text-sm px-4 py-2 leading-none border cursor-pointer rounded-full text-gray-200 border-gray-200 mt-4 lg:mt-0 hover:text-gray-900 hover:border-gray-900 hover:bg-gray-700">Log out</a>
            </div>
            <div v-else class="flex items-center">
                <router-link tag="a" to="/signin" class="inline-block text-sm px-4 py-2 leading-none border rounded-full text-gray-200 border-gray-200 mt-4 lg:mt-0">Sign in</router-link>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    computed:{
        user(){
            return this.$store.getters.user
        },
        navElements(){
            if(!this.$store.getters.user) {
                return [
                    {
                        title: 'Logear',
                        path: '/signin'
                    },
                    {
                        title: 'Crear usuario',
                        path: '/signup'
                    }
                ]
            }
            switch (this.$store.getters.user.cargo) {
                case 'administrador':
                    return [
                        {
                            title: 'Validar-transito',
                            path: '/transito-validar'
                        },
                        {
                            title: 'Usuarios-transito',
                            path: '/transito-registros'
                        },
                        {
                            title: 'Agrear Usuario',
                            path: '/admin-registros'
                        },
                        {
                            title: 'tests',
                            path: '/home'
                        }
                    ]

                case 'transito':
                    return [
                        {
                            title: 'Validar usuarios',
                            path: '/transito-validar'
                        },
                        {
                            title: 'Agregar usuario',
                            path: '/transito-registros'
                        }
                    ]
            
                default:
                    return [
                        {
                            title: 'Logear',
                            path: '/signin'
                        },
                        {
                            title: 'Crear usuario',
                            path: '/signup'
                        }
                    ]
            }
        }
    },
    methods:{
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/login')
        }
    }
}
</script>