/* eslint-disable */
export const state = () => ({
  users: [],
  user: {
    id: '',
    email: '',
    firstName: '',
    secondName: '',
    hillsBagged: [],
    bags: []
  },
  baggedSortOrder: 'asc',
  currentUserId: '',
})
export const mutations = {
  SET_USERS(state, users) {
    state.users = users
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_USER_BAGS(state, bags) {
    state.user.bags = bags
  },
  ADD_NEW_USER(state, user) {
    state.user = user
  },
  SET_CURRENT_USER(state, userId) {
    state.currentUserId = userId
  },
  SET_HILLS_BAGGED(state, hillsBagged) {
    state.user.hillsBagged = hillsBagged
  },
  SET_HILLS_BAGGED_SORT_ORDER(state, bags) {
    state.user.bags = bags
  },
  ADD_NEW_BAG(state, bag) {
    state.user.bags.push(bag)
    state.user.hillsBagged.push(bag.hill_id)
  },
}
export const actions = {
  async fetchUser({
    commit,
    state,
    dispatch,
    rootState
  }, userId) {
    if (state.user.email !== '' && state.currentUserId === userId) return
    // if (state.currentUserId !== undefined) return

    const userRef = this.$fireStore.collection('users').doc(userId)
    let user = await userRef.get()
    commit('SET_USER', user.data())

    const bags = []
    let bagsRef = userRef.collection('bags')
    await bagsRef.orderBy('date', 'desc').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (bag) {
        let newBag = bag.data()
        //covert firestore timestamp to date
        newBag.date = newBag.date.toDate()
        bags.push(newBag)
      });
      commit('SET_USER_BAGS', bags)

      const hillsBagged = bags.map(bag => bag.hill_id)
      commit('SET_HILLS_BAGGED', hillsBagged)
    });


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
      hillsBagged: [],
      bags: []
    }

    const userRef = this.$fireStore.collection('users').doc(newUser.id)
    await userRef.set(newUser).catch(function (e) {
      error({
        statusCode: e.code,
        message: e.message
      })
    })

    commit('ADD_NEW_USER', newUser)
    commit('SET_CURRENT_USER', newUser.id)

    dispatch('loginRedirect')
  },
  resetUser({
    commit,
    dispatch
  }) {
    let emptyUser = {
      id: '',
      email: '',
      firstName: '',
      secondName: '',
      hillsBagged: [],
      bags: []
    }
    console.log('signed out')
    commit('SET_USER', emptyUser)
    commit('SET_CURRENT_USER', '')
    dispatch('logoutRedirect')
  },
  async login({
    commit,
    state,
    dispatch,
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
    dispatch
  }) {
    await this.$fireAuth.signOut().catch(function (e) {
      error({
        statusCode: e.code,
        message: e.message
      })
    })
    dispatch('resetUser')
  },
  logoutRedirect() {
    this.$router.push({
      path: '/',
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
      // dispatch('fetchUser', state.currentUserId)
    }
  },
  async createNewBag({
    commit,
    state,
    rootState
  }, bag) {
    const userRef = this.$fireStore.collection('users').doc(state.currentUserId).collection('bags')
    return await userRef.add(bag).then(function () {
      commit('ADD_NEW_BAG', bag)
    }).catch(function (e) {
      error({
        statusCode: e.code,
        message: e.message
      })
    })
  },
  sortHillsBagged({
    commit
  }, sortDirection) {
    const bags = this.user.bags
    switch (sortDirection) {
      case 'asc':
        bags.sort(function (a, b) {
          if (a.date < b.date) return -1
          if (a.date > b.date) return 1
        })
        break;
      case 'desc':
        bags.sort(function (a, b) {
          if (a.date > b.date) return -1
          if (a.date < b.date) return 1
        })
        break;
    }
    commit('SET_HILLS_BAGGED_SORT_ORDER', bags)
  }
}

export const getters = {
  // getBags: state => {
  //   switch (state.baggedSortOrder) {
  //     case 'asc':
  //       return state.user.bags.sort(function (a, b) {
  //         if (a.date < b.date) return -1
  //         if (a.date > b.date) return 1
  //       })
  //       break;
  //     case 'desc':
  //       return state.user.bags.sort(function (a, b) {
  //         if (a.date > b.date) return -1
  //         if (a.date < b.date) return 1
  //       })
  //       break;
  //   }

  // }
}
