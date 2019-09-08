export default {
    state: {
      transactionSelected: null,
      transactions: []
    },
    mutations: {
      setSelectedTransaction (state, payload) {
        console.log('in mutations set transacciones')
        console.log(payload)
        state.transactionSelected = payload
      },
      pushTransaction (state, payload) {
        //console.log('in mutations  add transacciones')
        //console.log(payload)
        state.transactions.push(payload)
      }
    },
    actions: {
      selectTransaction({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        if(payload){
            commit('setLoading', false)
            commit('setSelectedTransaction', payload)
        }else{
            commit('setError', 'Selected payload is null or undefined')
        }

      },
      addTransaction({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        if(payload){
            commit('setLoading', false)
            commit('pushTransaction', payload)
        }else{
            commit('setError', 'Payload is null or undefined')
        }
      },
    },
    getters: {
      selectedTransaction(state) {
        return state.transactionSelected
      },
      transactionsList(state){
        return state.transactions
      }
    }
  }