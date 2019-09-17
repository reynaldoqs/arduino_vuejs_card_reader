<template>
  <div class="router-view-height bg-gray-900 w-full p-1 flex items-center justify-center">
    <div class="text-md flex flex-col">
      <router-link v-for="(nav, index) in navElements" :key="index" tag="a" :to="nav.path"
          class="border rounded-full border-gray-300 px-5 py-4 m-2 text-gray-300 hover:text-gray-900 hover:border-gray-900 hover:bg-gray-700">{{nav.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      users:[],
    }
  },
  computed:{
  user(){
    return this.$store.getters.user
  },
  navElements(){
    if(!this.$store.getters.user) {
        return [
            {
              title: 'Ingresar al sistema',
              path: '/login'
            }
          ]
    }
            switch (this.$store.getters.user.cargo) {
              case 'administrador':
                  return [
                        {
                            title: 'Admin Registro',
                            path: '/admin-registro'
                        },
                        {
                            title: 'Admin Usuarios',
                            path: '/admin-usuarios'
                        },
                        {
                            title: 'Cajero Recargas',
                            path: '/cajero-recargas'
                        },
                        {
                            title: 'Odeco Registro',
                            path: '/odeco-registro'
                        },
                        {
                            title: 'Transito Registros',
                            path: '/transito-registros'
                        },
                        {
                            title: 'Transito Validacion',
                            path: '/transito-validacion'
                        }
                    ]
                default:
                    return [
                        {
                            title: 'Ingresar al sistema',
                            path: '/login'
                        }
                    ]
            }
        }
    },
}
</script>
