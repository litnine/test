import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import { getEnterpriseInfo } from '@/api/home';
// import { getCompany } from '@/api/enterprisemanagement';
import { loggedSynchro, userSynchro } from '@/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    get logged() {
      return loggedSynchro.get();
    },
    set logged(val) {
      loggedSynchro.set(val);
    },
    get userInfo() {
      return userSynchro.get();
    },
    set userInfo(val) {
      userSynchro.set(val);
    },
    appTitle: process.env.VUE_APP_TITLE,
    appLogo: process.env.VUE_APP_LOGO,
    headerLogo: process.env.VUE_APP_HEADER_SIGN_LOGO,
    logoStyle: process.env.VUE_APP_LOGIN_STYLE,
  },
  mutations: {
    setLogged(state, bool) {
      state.logged = bool;
    },
    setUserInfo(state, info) {
      state.userInfo = info;
    },
  },
  actions: {
    async loadUserInfo({ commit }) {
      const data = await getEnterpriseInfo();
      commit('setUserInfo', data.info);
    },
    login({ commit }) {
      commit('setLogged', true);
      const fullPath = router.currentRoute.query.redirect as string;
      router.push(fullPath || { name: 'Home' });
    },
    logout({ commit }, redirect?: true) {
      if (router.currentRoute.name !== 'Login') {
        router.push({ name: 'Login', query: { redirect: redirect && decodeURIComponent(router.currentRoute.fullPath) } });
      }
      commit('setLogged', false);
      commit('setUserInfo', undefined);
    },
  },
  modules: {
  },
});
