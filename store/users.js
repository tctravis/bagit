export const state = () => ({
  users: [],
  user: {},
  currentUser: '2bEUiSuz0Uk8CpGgY2Mk', // '2bEUiSuz0Uk8CpGgY2Mk'
})
export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_USER(state, user) {
    state.user = user
  },
}
export const actions = {
  async fetchUser({ commit, state, rootState }, userId) {
    if (Object.keys(state.user).length !== 0) return

    const userRef = this.$fireStore.collection('users').doc(userId)
    const user = await userRef.get()

    commit('SET_USER', user.data())
  },
}
