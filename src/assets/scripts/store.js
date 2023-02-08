import { createStore } from 'vuex'

const store = createStore({
  state: {
    isLoading: false
  },
  mutations: {
    changeLoading (state, status) {
      state.isLoading = status
    }
  }
})

export default store