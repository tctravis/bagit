/* eslint-disable */
export const state = () => ({
  user: {
    id: '',
    email: '',
    userName: '',
    totalBags: 0,
    hillsBagged: [],
    bags: []
    // bags: [{
    //   date: '',
    //   area: '',
    //   areaClassName: '',
    //   areaName: '',
    //   comments: '',
    //   date: '',
    //   heightRating: '',
    //   height_f: '',
    //   height_m: '',
    //   hill_id: '',
    //   id: '',
    //   name: '',
    //   os_grid_ref: '',
    //   os_map: '',
    //   prom_f: '',
    //   prom_m: '',
    //   rating: '',
    //   section: ''
    // }]
  },
  currentUserId: '',
  sortBy: 'date',
  sortAsc: true,
  bagModalState: false,
  hillToBagId: 0,
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
  SET_TOTAL_HILLS_BAGGED(state, totalBags) {
    state.user.totalBags = totalBags
  },
  ADD_NEW_BAG(state, bag) {
    state.user.bags.push(bag)
    state.user.hillsBagged.push(bag.hill_id)
  },
  BAG_MODAL_TOGGLE(state, bagModalState) {
    state.bagModalState = bagModalState
  },
  SET_HILL_TO_BAG(state, hillToBagId) {
    state.hillToBagId = hillToBagId
  },
  UPDATE_PROFILE(state, user) {
    state.user.userName = user.userName
  },
  UPDATE_EMAIL(state, email) {
    state.user.email = email
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

      commit('SET_TOTAL_HILLS_BAGGED', hillsBagged.length)
    });


  },
  async register({
    commit,
    state,
    rootState,
    dispatch
  }, credentials) {

    let newUser = {
      id: '',
      email: credentials.email,
      userName: credentials.userName,
      totalBags: 0,
      hillsBagged: [],
      bags: []
      // bags: [{
      //   date: '',
      //   area: '',
      //   areaClassName: '',
      //   areaName: '',
      //   comments: '',
      //   date: '',
      //   heightRating: '',
      //   height_f: '',
      //   height_m: '',
      //   hill_id: '',
      //   id: '',
      //   name: '',
      //   os_grid_ref: '',
      //   os_map: '',
      //   prom_f: '',
      //   prom_m: '',
      //   rating: '',
      //   section: ''
      // }]
    }

    try {
      const authUser = await this.$fireAuth.createUserWithEmailAndPassword(credentials.email, credentials.password)

      // also add user profile details to users firestore collection
      const userRef = this.$fireStore.collection('users').doc(authUser.user.uid)
      const addUserDetails = await userRef.set(newUser).catch(function (err) {
        return err
      })

      commit('ADD_NEW_USER', newUser)
      commit('SET_CURRENT_USER', authUser.user.uid)

      dispatch('loginRedirect')

    } catch (err) {
      return err
    }

  },

  resetUser({
    commit,
    dispatch
  }) {
    let emptyUser = {
      id: '',
      email: '',
      userName: '',
      totalBags: 0,
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
  }, credentials) {
    try {
      return await this.$fireAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
    } catch (err) {
      return err
    }
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
  async updateProfile({
    state,
    commit
  }, user) {
    try {
      const userRef = this.$fireStore.collection('users').doc(state.currentUserId)
      // const userRef = this.$fireStore.collection('users').doc('gfsgsfgsf')
      const userUpdate = await userRef.update(user)

      commit('UPDATE_PROFILE', user)
      return 'success'
    } catch (err) {
      return err
    }
  },
  async updateEmail({
    state,
    commit
  }, email) {
    const currentUser = this.$fireAuth.currentUser;
    try {
      const updateEmailRef = await currentUser.updateEmail(email)
      commit('UPDATE_EMAIL', email)
      return 'success'
    } catch (err) {
      return err
    }
  },
  logoutRedirect() {
    this.$router.push({
      path: '/',
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
    }
  },
  toggleBagModal({
    state,
    commit
  }) {
    let modalState = state.bagModalState ? false : true;
    commit('BAG_MODAL_TOGGLE', modalState)
  },
  closeBagModal({
    commit
  }) {
    commit('BAG_MODAL_TOGGLE', false)
  },
  setHillToBag({
    commit
  }, hillToBagId) {
    commit('SET_HILL_TO_BAG', hillToBagId)
  }
}

export const getters = {
  getUser(state) {
    return state.user
  },
  getUserBags(state) {
    return state.user.bags
  },
  getTotalAltClimbed: state => {
    let totalAltClimbed = 0
    totalAltClimbed = state.user.bags.reduce(function (
        accumulator,
        bag
      ) {
        return accumulator + parseInt(bag.prom_m)
      },
      0)
    return totalAltClimbed
  },
}
