//import * as firebase from 'firebase'
import firebase from 'firebase/app'
import "firebase/auth";
import {userSignUp, userSignIn} from '@/services/auth'
import router from '@/router'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp({commit}, payload){
      commit('setLoading', true)
      commit('clearError')
      userSignUp(payload).then( /*user*/() => {
        commit('setLoading', false)
        //user try and catch
        //sessionStorage.setItem('user',JSON.stringify(user.data))
        //commit('setUser', user.data)
      }).catch( error => {
        commit('setLoading', false)
        commit('setError', error)
      })
    },
    signUserFromSession({commit},payload){
      commit('clearError')
      commit('setUser', payload)
    },
    signUserIn({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      userSignIn(payload).then( user => {
        commit('setLoading', false)
        commit('setUser', user.data)
        sessionStorage.setItem('user',JSON.stringify(user.data))

        router.push('/home')
      }).catch( error => {
        commit('setLoading', false)
        commit('setError', error)
      })
    },
    signUserInGoogle({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          result => {
            commit('setLoading', false)
            const newUser = {
              id: result.user.uid,
              name: result.user.displayName,
              email: result.user.email,
              photoUrl: result.user.photoURL
            }
            console.log('its here')
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    resetPasswordWithEmail({ commit }, payload) {
      const { email } = payload
      commit('setLoading', true)
      firebase.auth().sendPasswordResetEmail(email)
      .then(
        () => {
          commit('setLoading', false)
          console.log('Email Sent')
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    logout({commit}) {
      sessionStorage.removeItem('user')
      commit('setUser', null)
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}