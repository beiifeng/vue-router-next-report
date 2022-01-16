export default {
  namespaced: true,
  state: {
    count: 0,
  },
  getters: {
    evenOrOdd: (state) => (state.count % 2 === 0 ? 'even' : 'odd'),
  },
  mutations: {
    increment(state) {
      Object.assign(state, {
        count: state.count + 1,
      });
    },
    decrement(state) {
      Object.assign(state, {
        count: state.count - 1,
      });
    },
  },
  actions: {
    increment: ({ commit }) => commit('increment'),
    decrement: ({ commit }) => commit('decrement'),
    incrementIfOdd({ commit, state }) {
      if ((state.count + 1) % 2 === 0) {
        commit('increment');
      }
    },
    incrementAsync({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('increment');
          resolve();
        }, 1000);
      });
    },
  },
};
