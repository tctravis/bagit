/* eslint-disable */
export const state = () => ({
  users: [],
  user: {
    hillsClimbed: [],
  },
  currentUserId: '',
})
export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_USER(state, user) {
    state.user = user
  },
  CREATE_NEW_USER(state, user) {
    state.user = user
  },
  SET_CURRENT_USER(state, userId) {
    state.currentUserId = userId
  },
}
export const actions = {
  async fetchUser({
    commit,
    state,
    dispatch,
    rootState
  }, userId) {
    if (state.user.email === '' && state.currentUserId === userId) return

    const userRef = this.$fireStore.collection('users').doc(userId)
    const user = await userRef.get()

    commit('SET_USER', user.data())
  },
  async register({
    commit,
    state,
    rootState,
    dispatch
  }, credentials) {
    const authUser = await this.$fireAuth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .catch(function (e) {
        error({
          statusCode: e.code,
          message: e.message
        })
      })

    const newUser = {
      id: authUser.user.uid,
      email: authUser.user.email,
      firstName: credentials.firstName,
      secondName: credentials.secondName,
      hillsClimbed: [],
    }

    const userRef = this.$fireStore.collection('users').doc(newUser.id)
    await userRef.set(newUser).catch(function (error) {
      console.error('Error writing document: ', error)
    })

    commit('CREATE_NEW_USER', newUser)
    commit('SET_CURRENT_USER', newUser.id)

    dispatch('loginRedirect')
  },
  async login({
    commit,
    state,
    dispatch,
    rootState
  }, credentials) {
    await this.$fireAuth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch(function (e) {
        error({
          statusCode: e.code,
          message: e.message
        })
      })

    dispatch('loginRedirect')
  },
  async signOut({
    commit,
    state,
    rootState
  }) {
    await this.$fireAuth.signOut().catch(function (e) {
      error({
        statusCode: e.code,
        message: e.message
      })
    })

    commit('SET_CURRENT_USER', '')
    commit('SET_USER', {
      hillsClimbed: [],
    })
  },
  logoutRedirect() {
    this.$router.push({
      path: '/user/login',
    })
  },
  loginRedirect() {
    this.$router.push({
      path: '/user/dashboard',
    })
  },
  onAuthStateChangedAction: ({
    state,
    commit,
    dispatch
  }, {
    authUser,
    claims
  }) => {
    if (!authUser) {
      dispatch('logoutRedirect')
      // Perform logout operations
    } else {
      commit('SET_CURRENT_USER', authUser.uid)
      dispatch('fetchUser', state.currentUserId)
    }
  },
}
