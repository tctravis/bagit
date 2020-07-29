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
  //   async fetchUser({ commit }, userId) {
  //     const ref = this.$fireStore.collection('users').doc(userId)
  //     let snapshot
  //     try {
  //       snapshot = await ref.get()
  //     } catch (e) {
  //       // eslint-disable-next-line
  //       console.log(e)
  //     }
  //     commit('SET_USER', snapshot.data())
  //   },
  async get({ commit, state }) {
    const userRef = this.$fireStore.collection('users')
    const users = await userRef.get()

    users.forEach((user) => commit('SET_USER', { user }))
  },
}
