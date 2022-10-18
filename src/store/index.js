import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import address from './address'
import categories from './categories'
import products from './products'
import cart from './cart'
import menu from './menu'
import unit from './unit'
import shop from './shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    }
  },
  modules: {
    auth: auth,
    category: categories,
    product: products,
    address: address,
    cart: cart,
    menu: menu,
    unit: unit,
    shop: shop
  }
})