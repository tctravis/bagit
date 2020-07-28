import hillData from '@/static/wainwrights.json'

export const state = () => ({
  hills: [],
  hill: {},
  areas: [
    {
      id: 'N',
      name: 'Northern',
    },
    {
      id: 'S',
      name: 'Southern',
    },
    {
      id: 'E',
      name: 'Eastern',
    },
    {
      id: 'W',
      name: 'Western',
    },
    {
      id: 'FE',
      name: 'Far Eastern',
    },
    {
      id: 'C',
      name: 'Central',
    },
    {
      id: 'NW',
      name: 'North Western',
    },
  ],
  highestHill: 978,
  lowestHill: 290,
})

export const mutations = {
  SET_HILLS(state, hills) {
    state.hills = hills
  },
  SET_HILL(state, hill) {
    state.hill = hill
  },
}

export const actions = {
  fetchHills({ commit, state }) {
    // add full name of each area to hills data
    const hills = hillData.hills.map(function (hill) {
      // find full area name from areas array in state
      const o = Object.assign({}, hill)

      const fullAreaName = state.areas.find((el) => el.id === hill.area).name
      o.areaName = fullAreaName

      let heightRating = 0
      const heightIncrement = (state.highestHill - state.lowestHill) / 3

      if (hill.height_m < state.lowestHill + heightIncrement) {
        heightRating = 1
      } else if (hill.height_m < state.lowestHill + heightIncrement * 2) {
        heightRating = 2
      } else {
        heightRating = 3
      }

      o.heightRating = heightRating
      return o
    })
    commit('SET_HILLS', hills)
    // commit('SET_HILLS_TOTAL', hills.length)
  },
}
