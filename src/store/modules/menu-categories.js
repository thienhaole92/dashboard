import { MenuCategoriesServices } from '../../services'

/**
 * Initial state
 */
const state = {
}

/**
 * Getters
 */
const getters = {
}

/**
 * Mutations
 */
const mutations = {
}

/**
 * Actions
 */
const actions = {
  /**
   * Create menu category
   */
  createMenuCategory: ({ commit }, payload) => {
    return MenuCategoriesServices.post('', payload)
  }
}

// Export module
export default { state, getters, mutations, actions }
