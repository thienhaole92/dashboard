import { MerchantService } from '../../services'

const UPDATE_MERCHANTS_LIST = 'UPDATE_MERCHANTS_LIST'
const SET_MERCHANT_DETAILS = 'SET_MERCHANT_DETAILS'
const SET_MENU_CATEGORIES = 'SET_MENU_CATEGORIES'

/**
 * Initial state
 */
const state = {
  merchants: [],
  total: 0,
  merchantDetails: null,
  categories: []
}

/**
 * Getters
 */
const getters = {
  merchants: (state) => {
    return state.merchants
  },
  total: (state) => {
    return state.total
  },
  merchantDetails: (state) => {
    return state.merchantDetails
  },
  categories: (state) => {
    return state.categories
  }
}

/**
 * Mutations
 */
const mutations = {
  UPDATE_MERCHANTS_LIST (state, data) {
    state.merchants = []
    state.total = data.total
    state.merchants = state.merchants.concat(data.merchants)
  },
  SET_MERCHANT_DETAILS (state, data) {
    state.merchantDetails = null
    state.merchantDetails = data
  },
  SET_MENU_CATEGORIES (state, categories) {
    state.categories = []
    state.categories = categories
  }
}

/**
 * Actions
 */
const actions = {
  /**
   * Get merchants with page
   */
  getMerchants: ({ commit }, { page, limit }) => {
    const options = {
      params: {
        page: page,
        limit: limit
      }
    }
    return MerchantService.get(null, options).then((res) => {
      const merchants = res.data.data
      const total = res.data.pagination.total
      commit(UPDATE_MERCHANTS_LIST, { merchants, total })
      return merchants
    })
  },
  /**
   * Get merchant detail by id
   */
  getMerchantDetails: ({ commit }, id) => {
    return MerchantService.get(`${id}`, null).then((res) => {
      const merchant = res.data.data
      commit(SET_MERCHANT_DETAILS, merchant)
      return merchant
    })
  },
  /**
   * Get all merchant menu categories
   */
  getMerchantMenuCategories: ({ commit }, id) => {
    return MerchantService.get(`${id}/menu_categories`, null).then((res) => {
      const categories = res.data.data
      commit(SET_MENU_CATEGORIES, categories)
      return categories
    })
  },
  /**
   * Get all merchant menu categories
   */
  createNewMerchant: ({ commit }, payload) => {
    return MerchantService.post(null, payload)
  }
}

// Export module
export default { state, getters, mutations, actions }
