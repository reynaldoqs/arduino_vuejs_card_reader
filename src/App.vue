<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition
        name="fade"
        mode="out-in"
      >
        <router-view/>
    </transition>
     <loading
     :show="loading"
     :overlay="true"
     label="Cargando...">
    </loading>
    <notifications group="alert" position="bottom right" />
       <notifications group="foo" position="bottom right" :duration="15000">
           <template slot="body" slot-scope="props">
            <div @click="() => {$store.dispatch('selectTransaction', props.item.data)}"
                class="bg-gray-900 p-1 rounded shadow-2xl  mb-1 mr-4 cursor-pointer">
                <a class="title">
                </a>
                <a class="close">
                <i class="fa fa-fw fa-close"></i>
                </a>
                <div class="flex">
                    <img class="h-20 w-20 object-cover rounded" :src="props.item.data.photoUrl" alt="usuario">
                    <div class="p-2 flex  w-full items-center">
                        <div class="w-full text-left">
                         <p class="font-bold text-xs text-gray-500">
                            Tarjeta: {{props.item.data.idTarjeta}} 
                        </p>
                        <p class="font-bold text-sm text-gray-400 mb-1">
                            {{props.item.data.nombres}} {{props.item.data.apellidoPaterno}} {{props.item.data.apellidoMaterno}}
                        </p>
                        <div class="flex justify-between">
                            <p class="text-xs text-gray-500 leading-none">CI: {{props.item.data.ci}}</p>
                            <p v-if="props.item.data.type === 'validacion'" class="px-1 custom-p rounded text-xs text-left text-green-600 leading-none">{{props.item.data.type}}</p>
                            <p v-if="props.item.data.type === 'descuento'" class="px-1 custom-p rounded text-xs text-left text-orange-600 leading-none">{{props.item.data.type}}</p>
                            <p v-if="props.item.data.type === 'actualizacion'" class=" px-1 custom-p rounded text-xs text-left text-blue-600 leading-none">{{props.item.data.type}}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
       </notifications>
  </div>
</template>
<script>
import { checkUserSession } from '@/mixins/userSessionInit'
import NavBar from '@/components/NavBar'
import loading from 'vue-full-loading'
export default {
  mixins:[checkUserSession],
  components:{
    NavBar,
    loading
  },
  computed:{
    loading(){
      return this.$store.getters.loading
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
  --view-height:calc(100vh - 64px);
  --left-navbar: 280px;
}
.router-view-height{
  height: var(--view-height);
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
