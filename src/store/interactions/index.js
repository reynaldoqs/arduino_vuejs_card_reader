import { validate } from '@/services/validacion'
import firebase from 'firebase/app'
import "firebase/database";

export default {
    state: {
      transactionSelected: null,
      transactions: []
    },
    mutations: {
      setSelectedTransaction (state, payload) {
        state.transactionSelected = payload
      },
      pushTransaction (state, payload) {
        let index = state.transactions.findIndex(e => e.idTarjeta === payload.idTarjeta)
        if( index === -1){
          state.transactions.push(payload)
        } else {
          state.transactions.splice(index,1)
          state.transactions.push(payload)
        }
        
      }
    },
    actions: {
      selectTransaction({commit}, payload) {
        commit('setLoading', true)
        commit('clearError')
        if(payload){
            setTimeout(() => {
              commit('setLoading', false)
              commit('setSelectedTransaction', payload)
            }, 300);
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
      clearTransaction({commit}) {
        commit('setSelectedTransaction', null)
      },
      validateTransaction({commit}, payload){
        commit('setLoading', true)
        commit('clearError')
        const {observaciones, botiquin, extintor, triangulo, placasLaterales, llantaAuxilio, herramientas} = payload
        const data = {observaciones, botiquin, extintor, triangulo, placasLaterales, llantaAuxilio, herramientas, type:'actualizacion'}
        const { idTarjeta } = payload.usuario;
        firebase.database().ref('transacciones').child(idTarjeta).update(data).then(() => {
          validate(payload)
          .then(
            () => {
              commit('setLoading', false)
              commit('setSelectedTransaction', null)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
            }
          )
        })
        
      }
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