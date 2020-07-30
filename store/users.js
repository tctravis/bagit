export const state = () => ({
  users: [],
  currentUser: 1,
})
export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_USER(state, { user }) {
    state.users = { ...state.users, [user.id]: user.data() }
  },
}
export const actions = {
  async get({ commit, state }) {
    const userRef = this.$fireStore.collection('users')
    const users = await userRef.get()

    users.forEach((user) => commit('SET_USER', { user }))
  },
}
