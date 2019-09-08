<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view/>
     <loading
     :show="loading"
     :overlay="true"
     label="Cargando...">
    </loading>
  </div>
</template>
<script>
import { firebaseChanges } from '@/mixins/initFirebaseApp'
import { transactionsChanges } from '@/mixins/transactionsInit'
import NavBar from '@/components/NavBar'
import loading from 'vue-full-loading'
export default {
  mixins:[firebaseChanges, transactionsChanges],
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
  --view-height:calc(100vh - 64px);
  font-family: 'Roboto', sans-serif;
}
.router-view-height{
  height: var(--view-height);
}
</style>
