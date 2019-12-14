<template>
<div class="router-view-height bg-gray-900 w-full p-1 flex items-center justify-center">
    <div class="wrapper text-md container mx-auto">
        <router-link v-for="(nav, index) in navElements" :key="index" tag="a" :to="nav.path" class="box border rounded-full border-gray-300 px-5 py-4 m-2 text-gray-300 hover:text-gray-900 hover:border-gray-900 hover:bg-gray-700">
            {{nav.title}}
            <font-awesome-icon :icon="nav.icon" class="ml-2" />
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            users: [],
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        navElements() {
            if (!this.$store.getters.user) {
                return [{
                    title: 'Ingresar al sistema',
                    path: '/login'
                }]
            }
            switch (this.$store.getters.user.cargo) {
                case 'administrador':
                    return [

                        {
                            title: 'Transito Cliente',
                            path: '/transito-registro-cliente',
                            icon: 'users'
                        },
                        {
                            title: 'Transito clientes lista',
                            path: '/transito-clientes',
                            icon: 'list'
                        },
                        {
                            title: 'Transito Validacion',
                            path: '/transito-validacion',
                            icon: 'check-square'
                        },
                        {
                            title: 'Validaciones lista',
                            path: '/admin-validaciones-list',
                            icon: 'list'
                        },
                        {
                            title: 'Cajero Recargas',
                            path: '/cajero-recargas',
                            icon: 'money-bill'
                        },
                        {
                            title: 'Recargas Lista',
                            path: '/admin-recargas-list',
                            icon: 'list'
                        },
                        {
                            title: 'Odeco Registro',
                            path: '/odeco-registro',
                            icon: 'cog'
                        },
                        {
                            title: 'Odeco objetos perdidos',
                            path: '/odeco-objetos',
                            icon: 'list'
                        },
                        {
                            title: 'Admin Registro',
                            path: '/admin-registro',
                            icon: 'users'
                        },
                        {
                            title: 'Admin Usuarios',
                            path: '/admin-usuarios',
                            icon: 'users'
                        },
                        {
                            title: 'Descuentos',
                            path: '/descuentos',
                            icon: 'money-bill'
                        },

                    ]
                case 'cajero':
                    return [{
                            title: 'Cajero Recargas',
                            path: '/cajero-recargas',
                            icon: 'money-bill'
                        },
                        {
                            title: 'Recargas Lista',
                            path: '/admin-recargas-list',
                            icon: 'list'
                        },
                    ]
                case 'odeco':
                    return [{
                            title: 'Odeco Registro',
                            path: '/odeco-registro',
                            icon: 'cog'
                        },
                        {
                            title: 'Odeco objetos perdidos',
                            path: '/odeco-objetos',
                            icon: 'list'
                        }
                    ]
                case 'transito-validador':
                    return [{
                            title: 'Transito Validacion',
                            path: '/transito-validacion',
                            icon: 'check-square'
                        },
                        {
                            title: 'Validaciones lista',
                            path: '/admin-validaciones-list',
                            icon: 'list'
                        },
                    ]
                case 'transito-administrador':
                    return [{
                            title: 'Transito cliente',
                            path: '/transito-registro-cliente',
                            icon: 'users'
                        },
                        {
                            title: 'Transito clientes lista',
                            path: '/transito-clientes',
                            icon: 'users'
                        },
                        {
                            title: 'Validaciones lista',
                            path: '/admin-validaciones-list',
                            icon: 'list'
                        },
                    ]
                default:
                    return [{
                        title: 'Ingresar al sistema',
                        path: '/login',
                        icon: 'cog'
                    }]
            }
        }
    },
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

.wrapper>a {
    display: block;
    width: 255px;
    margin: 10px;
}

.box {
    padding: 20px;
    display: block;
}
</style>
