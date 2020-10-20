import Vue from "vue";
import Vuex from "vuex";
import { news } from "@/store/components/news";
import { connections } from "@/store/components/connections";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    news,
    connections
  }
});
