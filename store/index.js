// /store/index.js

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    user: null,
    submissions: null,
    solicitations: null,
    solicitation: null
  },
  actions,
  getters,
  mutations
}
