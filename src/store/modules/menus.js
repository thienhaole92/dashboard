import { MenuServices } from '../../services'

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
  createMenu: ({ commit }, payload) => {
    return MenuServices.post('', payload)
  }
}

// Export module
export default { state, getters, mutations, actions }
