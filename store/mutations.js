// /store/mutations.js

export default {
  SET_USER(state, user) {
    state.user = user || null
  },
  SET_SUBMISSIONS(state, payload) {
    state.submissions = payload
  },
  SET_SOLICITATIONS(state, payload) {
    state.solicitations = payload
  },
  SET_SOLICITATION(state, payload) {
    state.solicitation = payload
  },
  SET_SNACK(state, snack) {
    state.snack = snack
  }
}
