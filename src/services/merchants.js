/**
 * Merchants service
 */

import Resource from './resource'

class Merchants extends Resource {
  constructor () {
    super('merchants')
  }
}

export default new Merchants()
