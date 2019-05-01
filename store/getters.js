// /store/getters.js

export default {
  isAuthenticated(state) {
    return !!state.user
  },
  submissions(state) {
    return state.submissions
  },
  getSolicitations(state) {
    return state.solicitations
  },
  getSolicitation(state) {
    return state.solicitation
  },
  getAlertType(state) {
    return state.globalAlertType
  },
  getAlertMessage(state) {
    return state.globalAlertMessage
  }
}
