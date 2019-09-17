import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import interactions from './interactions'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user: user,
        shared: shared,
        interactions: interactions
    }
})