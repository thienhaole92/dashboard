import { AuthService } from '../services'
import { CHANGE_SESSION, TOGGLE_SIDEBAR_COLLAPSE, INCREMENT, DECREMENT } from './mutation-types'

export default {
  /**
   * Change page title
   */
  changeTitle: ({ commit }, title) => {
    commit(CHANGE_SESSION, { title: title })
  },

  /**
   * Create a new client token
   */
  createToken: ({ commit }, { email, password }) => {
    const params = {
      email: email.trim(),
      password: password.trim()
    }

    return AuthService.post('auth', params)
      .then(res => {
        const data = res.data.data
        commit(CHANGE_SESSION, { token: data.token })
        return data.token
      })
  },

  /**
   * Check if the client token is available
   */
  checkToken: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      // validate local store
      if (!getters.session.token) {
        return resolve(false)
      }
      // remote
      AuthService.get()
        .then(res => resolve(true))
        .catch(err => {
          console.error(err)
          commit(CHANGE_SESSION, { token: null })
          resolve(false)
        })
    })
  },

  /**
   * Delete client token
   */
  deleteToken: ({ commit, getters }) => {
    return AuthService.delete(getters.session.token)
      .then(res => {
        commit(CHANGE_SESSION, { token: null })
      })
  },

  /**
   * Get current logged-in user information
   */
  getCurrentUser: ({ commit }) => {
    return AuthService.get('me')
      .then(res => {
        const data = res.data.data
        commit(CHANGE_SESSION, { user: data })
        return data
      })
  },

  /**
   * Toggle the expansion of the sidebar
   */
  toggleSidebarCollapse: ({ commit }) => {
    commit(TOGGLE_SIDEBAR_COLLAPSE)
  },

  // ==================== DEMO ====================

  /**
   * Increase the counter count
   */
  increment: ({ commit }) => commit(INCREMENT),

  /**
   * Increase the counter count
   */
  incrementAsync: ({ commit }) => setTimeout(() => commit(INCREMENT), 1000),

  /**
   * Decrease counter count
   */
  decrement: ({ commit }) => commit(DECREMENT),

  /**
   * Decrease counter count
   */
  decrementAsync: ({ commit }) => setTimeout(() => commit(DECREMENT), 1000)
}
