import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebar: {
      opened: true
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened;
    },
    CLOSE_SIDEBAR: state => {
      state.sidebar.opened = false;
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    closeSideBar({ commit }) {
      commit("CLOSE_SIDEBAR");
    }
  },
  modules: {},
  getters: {
    sidebar: state => state.sidebar
  }
});
