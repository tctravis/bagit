/* eslint-disable */
import hillData from '@/content/hills.json'

export const state = () => ({
  hills: [],
  hill: {},
  areas: [{
    id: 'N',
    name: 'Northern',
    className: 'northern'
  },
  {
    id: 'S',
    name: 'Southern',
    className: 'southern'
  },
  {
    id: 'E',
    name: 'Eastern',
    className: 'eastern'
  },
  {
    id: 'W',
    name: 'Western',
    className: 'western'
  },
  {
    id: 'FE',
    name: 'Far Eastern',
    className: 'fareastern'
  },
  {
    id: 'C',
    name: 'Central',
    className: 'central'
  },
  {
    id: 'NW',
    name: 'North Western',
    className: 'northwestern'
  },
  ],
  towns: [
    {
      loc: {
        'lat': '54.3266523',
        'lng': '-2.7763236'
      },
      name: 'Kendal',
      slug: 'kendal'
    },
    {
      loc: {
        'lat': '54.4282623',
        'lng': '-2.9787857'
      },
      name: 'Ambleside',
      slug: 'ambleside'
    },
    {
      loc: {
        'lat': '54.6025494',
        'lng': '-3.1478323'
      },
      name: 'Keswick',
      slug: 'keswick'
    },
    {
      loc: {
        'lat': '54.36998',
        'lng': '-3.0842284'
      },
      name: 'Coniston',
      slug: 'coniston'
    },
    {
      loc: {
        'lat': '54.3721393',
        'lng': '-3.0722986'
      },
      name: 'Hawkshead',
      slug: 'hawkshead'
    },
    {
      loc: {
        'lat': '54.4624074',
        'lng': '-3.031161'
      },
      name: 'Grasmere',
      slug: 'grasmere'
    },
    {
      loc: {
        'lat': '54.6606719',
        'lng': '-3.3796767'
      },
      name: 'Cockermouth',
      slug: 'cockermouth'
    }
  ],
  highestHill: 0,
  lowestHill: 0,
  maxHeightRating: 5,
  totalHills: 0,
  hillList: {
    filters: {
      area: '',
      bagged: 'all', // 'bagged', 'unbagged', 'all'
      town: '',
      heightRanges: []
    },
    sort: 'asc',
    sortObj: {
      type: 'alphabetic',
      param: 'a-z'
    }
  }
})

export const mutations = {
  SET_HILLS(state, hills) {
    state.hills = hills
  },
  SET_HILL(state, hill) {
    state.hill = hill
  },
  SET_TOTAL_HILLS(state, totalHills) {
    state.totalHills = totalHills
  },
  SET_LOWEST_HILL(state, lowestHill) {
    state.lowestHill = lowestHill
  },
  SET_HIGHEST_HILL(state, highestHill) {
    state.highestHill = highestHill
  },
  SET_HILL_LIST_FILTERS(state, filters) {
    let filterObj = {
      ...state.hillList.filters,
      ...filters
    }
    state.hillList.filters = filterObj
  },
  SET_HILL_LIST_SORT(state, sortOrder) {
    state.hillList.sort = sortOrder
  },
}

export const actions = {
  fetchHills({
    commit,
    state
  }) {
    if (state.hills.length === 0) {

      commit('SET_LOWEST_HILL', 290)
      commit('SET_HIGHEST_HILL', 978)

      // add full name of each area to hills data
      const hills = hillData.hills.map(function (hill) {
        // find full area name from areas array in state
        const o = Object.assign({}, hill)

        const fullAreaName = state.areas.find((el) => el.id === hill.area).name
        o.areaName = fullAreaName

        o.areaClassName = fullAreaName.toLowerCase().replace(/ /g, '')

        let heightRating = 0
        const heightIncrement = Math.ceil((state.highestHill - state.lowestHill) / state.maxHeightRating)

        for (let i = 1; i <= state.maxHeightRating; i++) {
          if (hill.height_m < (state.lowestHill + (heightIncrement * i))) {
            heightRating = i
            break
          }
        }

        o.heightRating = heightRating.toString()
        return o
      })
      commit('SET_HILLS', hills)
      commit('SET_TOTAL_HILLS', hills.length)
      return hills
    }
  },
  filterHillList({
    commit
  }, filters) {
    commit('SET_HILL_LIST_FILTERS', filters)
  },

  sortHillList({
    commit
  }, sortOrder) {
    commit('SET_HILL_LIST_SORT', sortOrder)
  }
}
export const getters = {
  getHills(state) {
    return state.hills
  },
  getTowns(state) {
    return state.towns
  },
  getAreas(state) {
    return state.areas
  },
  getTotalHills(state) {
    return state.totalHills
  },
  getHillById: (state) => (id) => {
    return state.hills.find((hill) => hill.id === id)
  },
}
