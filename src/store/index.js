import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import auth from './modules/auth'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    book,
    auth,
  },
  strict: debug,
})
