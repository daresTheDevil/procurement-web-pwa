// /store/actions.js

import feathers from '@/plugins/feathers'

export default {
  getSubmissions({ commit }) {
    return feathers
      .service('submissions')
      .find()
      .then(response => {
        commit('SET_SUBMISSIONS', response.data)
      })
  },
  callSolicitations({ commit }) {
    return feathers
      .service('solicitations')
      .find()
      .then(response => {
        commit('SET_SOLICITATIONS', response.data)
      })
  },
  callSolicitation({ commit, state }) {
    const id = state.solicitation
    return feathers
      .service('solicitations')
      .find({
        query: {
          _id: id
        }
      })
      .then(response => {
        commit('SET_SOLICITATION', response.data)
      })
  },
  jwt({ commit }, { accessToken }) {
    return feathers
      .authenticate({ strategy: 'jwt', accessToken })
      .then(response => {
        return feathers.passport.verifyJWT(response.accessToken)
      })
      .then(payload => {
        return feathers.service('users').get(payload.userId)
      })
      .then(user => {
        commit('SET_USER', user)
      })
  },
  azure({ commit }, { email, password }) {
    return (
      feathers
        // .authenticate({ strategy: 'local', email, password })
        .authenticate({ strategy: 'azure', email, password })
        .then(response => {
          // eslint-disable-next-line no-console
          console.log('azure response', response)
          return feathers.passport.verifyJWT(response.accessToken)
        })
        .then(payload => {
          // eslint-disable-next-line no-console
          console.log('azure payload', payload)
          return feathers.service('users').get(payload.userId)
        })
        .then(user => {
          commit('SET_USER', user)
        })
    )
  },
  login({ commit }, { email, password }) {
    return (
      feathers
        // .authenticate({ strategy: 'local', email, password })
        .authenticate({ strategy: 'local', email, password })
        .then(response => {
          // eslint-disable-next-line no-console
          console.log('azure response', response)
          return feathers.passport.verifyJWT(response.accessToken)
        })
        .then(payload => {
          // eslint-disable-next-line no-console
          console.log('azure payload', payload)
          return feathers.service('users').get(payload.userId)
        })
        .then(user => {
          commit('SET_USER', user)
        })
    )
  },
  logout({ commit }) {
    return feathers.logout().then(() => {
      commit('SET_USER', null)
    })
  },
  register({ dispatch }, { email, password }) {
    return feathers
      .service('users')
      .create({ email, password })
      .then(response => {
        return dispatch('login', { email, password })
      })
  }
}
