/**
 * Resource class
 */

import { axios } from '../utils'

export default class Resource {
  constructor (base) {
    this.base = base
    this.axios = axios
  }

  get (endpoint, options) {
    const url = endpoint == null ? `/${this.base}` : `/${this.base}/${endpoint}`
    return this.axios.get(url, options)
  }

  post (endpoint, options) {
    const url = endpoint == null ? `/${this.base}` : `/${this.base}/${endpoint}`
    return this.axios.post(url, options)
  }

  put (endpoint, options) {
    const url = endpoint == null ? `/${this.base}` : `/${this.base}/${endpoint}`
    return this.axios.put(url, options)
  }

  patch (endpoint, options) {
    const url = endpoint == null ? `/${this.base}` : `/${this.base}/${endpoint}`
    return this.axios.patch(url, options)
  }

  delete (endpoint, options) {
    const url = endpoint == null ? `/${this.base}` : `/${this.base}/${endpoint}`
    return this.axios.delete(url, options)
  }
}
