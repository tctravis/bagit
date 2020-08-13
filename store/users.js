/* eslint-disable */
export const state = () => ({
  users: [],
  user: {
    id: '',
    email: '',
    firstName: '',
    secondName: '',
    hillsBagged: [],
    bags: [{
      date: '',
      area: '',
      areaClassName: '',
      areaName: '',
      comments: '',
      date: '',
      heightRating: '',
      height_f: '',
      height_m: '',
      hill_id: '',
      id: '',
      name: '',
      os_grid_ref: '',
      os_map: '',
      prom_f: '',
      prom_m: '',
      rating: '',
      section: ''
    }]
  },
  currentUserId: '',
  sortBy: 'date',
  sortAsc: true
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
  SET_USER_BAGS_DETAILS(state, bags) {
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
    let hills = rootState.hills.hills

    await bagsRef.orderBy('date', 'desc').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (bag) {
        let newBag = bag.data()

        //covert firestore timestamp to date
        newBag.date = newBag.date.toDate()

        //add extra details from hills module
        let hillDetails = hills.find(hill => hill.id === newBag.hill_id)
        if (hillDetails) {
          newBag = Object.assign({}, newBag, hillDetails)
        }

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
    rootState,
    error
  }, bag) {
    try {
      const alreadyBagged = state.user.bags.some(userbag => userbag.hill_id === bag.hill_id)
      if (alreadyBagged) {
        throw 'prebagged'
      }
      const userRef = this.$fireStore.collection('users').doc(state.currentUserId).collection('bags')
      return await userRef.add(bag).then(function () {

        let hills = rootState.hills.hills,
          hillDetails = hills.find(hill => hill.id === bag.hill_id)

        let bagWithDetails = {
          ...bag,
          ...hillDetails
        }

        commit('ADD_NEW_BAG', bagWithDetails)
      })
    } catch (error) {
      return error
      // console.log(error)
    }
  }
}

export const getters = {
  getTotalAltClimbed: state => {
    let totalAltClimbed = 0
    totalAltClimbed = state.user.bags.reduce(function (
        accumulator,
        bag
      ) {
        return accumulator + bag.height_m
      },
      0)
    return totalAltClimbed
  },
  sortedBagsDesc: state => {
    let bagsSorted = []
    bagsSorted = [...state.user.bags].sort((a, b) => {
      if (a[state.sortBy] > b[state.sortBy]) return -1
      if (a[state.sortBy] < b[state.sortBy]) return 1
      return 0
    })
    if (!state.sort_asc) {
      bagsSorted.reverse()
    }
    return bagsSorted
  }
}
