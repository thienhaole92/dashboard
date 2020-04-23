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
  },
  /**
   * Create menu category
   */
  updateMenu: ({ commit }, { id, payload }) => {
    return MenuServices.put(id, payload)
  },
  deleteMenu: ({ commit }, { id }) => {
    return MenuServices.delete(id, null)
  }
}

// Export module
export default { state, getters, mutations, actions }
