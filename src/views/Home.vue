<template>
  <div class="router-view-height bg-gray-900 w-full p-1 flex items-center justify-center">
    <div class="wrapper text-md container mx-auto">
        <router-link v-for="(nav, index) in navElements" :key="index" tag="a" :to="nav.path"
          class="box border rounded-full border-gray-300 px-5 py-4 m-2 text-gray-300 hover:text-gray-900 hover:border-gray-900 hover:bg-gray-700">{{nav.title}}</router-link>
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
                  title: 'Admin Validaciones lista',
                  path: '/admin-validaciones-list'
              },
              {
                title: 'Admin Recargas Lista',
                path: '/admin-recargas-list'
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
                title: 'Odeco objetos perdidos',
                path: '/odeco-objetos'
              },
              {
                  title: 'Transito Validacion',
                  path: '/transito-validacion'
              },
              {
                  title: 'Transito cliente',
                  path: '/transito-registro-cliente'
              },
              {
                  title: 'Transito clientes lista',
                  path: '/transito-clientes'
              }
           ]
      case 'cajero':
         return [
              {
                  title: 'Cajero Recargas',
                  path: '/cajero-recargas'
              }
           ]
      case 'odeco':
         return [
              {
                  title: 'Odeco Registro',
                  path: '/odeco-registro'
              },
              {
                title: 'Odeco objetos perdidos',
                path: '/odeco-objetos'
              }
           ]
      case 'transito-validador':
         return [
              {
                  title: 'Transito Validacion',
                  path: '/transito-validacion'
              },
              {
                  title: 'Admin Validaciones lista',
                  path: '/admin-validaciones-list'
              },
           ]
      case 'transito-administrador':
         return [
              {
                  title: 'Transito cliente',
                  path: '/transito-registro-cliente'
              },
              {
                  title: 'Transito clientes lista',
                  path: '/transito-clientes'
              },
              {
                  title: 'Admin Validaciones lista',
                  path: '/admin-validaciones-list'
              },
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
<style scoped>
  .wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  }
  .box{
    padding: 20px;
    display: block;
  }
</style>