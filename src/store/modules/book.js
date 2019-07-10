import {
  BOOKS_REQUEST, BOOKS_SUCCESS,
  BOOKS_ERROR, BOOK_ID_REQUEST,
  BOOK_ID_SUCCESS, BOOK_ID_ERROR,
  BOOK_CREATED_SUCCESS,
  BOOK_CREATED_REQUEST
} from '../actions/book'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'
import axios from 'axios'

const state = { status: '', book: {}, books: {} }

const getters = {
  getBooks: state => state.books,
  getBook: state => state.book,
  isBooksLoaded: state => !!state.books,
}

const actions = {
  [BOOKS_REQUEST]: ({commit, dispatch}) => {
    commit(BOOKS_REQUEST)
    axios.get('http://localhost:3000/books',
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user-token')}`
        }
      })
      .then(resp => {
        commit(BOOKS_SUCCESS, resp.data)
      })
      .catch(resp => {
        commit(BOOKS_ERROR)
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT)
      })
  },
  [BOOK_ID_REQUEST]: ({commit, dispatch}, book) => {
    commit(BOOK_ID_REQUEST)
    axios.get(`http://localhost:3000/books/${book.id}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user-token')}`
        }
      })
      .then(resp => {
        commit(BOOK_ID_SUCCESS, resp.data)
      })
      .catch(resp => {
        commit(BOOK_ID_ERROR)
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT)
      })
  },
  [BOOK_CREATED_REQUEST]: ({commit, dispatch}, book) => {
    commit(BOOK_CREATED_REQUEST)
    axios({ url: 'http://localhost:3000/books/new', data: book, method: 'POST', headers: {'Authorization': `Bearer ${localStorage.getItem('user-token')}`} })
      .then(resp => {
        commit(BOOK_CREATED_SUCCESS)
        dispatch(BOOKS_REQUEST)
      })
    .catch(resp => {
      commit(BOOKS_ERROR)
      // if resp is unauthorized, logout, to
      dispatch(AUTH_LOGOUT)
    })
  }
}

const mutations = {
  [BOOKS_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [BOOK_ID_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [BOOK_CREATED_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [BOOKS_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'books', resp)
  },
  [BOOK_ID_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'book', resp)
  },
  [BOOK_CREATED_SUCCESS]: (state) => {
    state.status = 'success'
  },
  [BOOKS_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.books = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
