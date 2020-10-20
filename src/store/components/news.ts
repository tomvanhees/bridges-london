import { NewsItem } from "@/classes/NewsItem";

export const news = {
  namespaced: true,
  state: {
    items: [] as NewsItem[],
    showNewsItem: false,
    selectedNewsItem: null
  },
  mutations: {
    set(state: any, data: NewsItem[]) {
      state.items = data;
    },
    showItem(state: any, data: NewsItem) {
      state.selectedNewsItem = data;
      state.showNewsItem = true;
    },
    closeShowItem(state: any) {
      state.showNewsItem = false;
      state.selectedNewsItem = null;
    }
  },
  actions: {
    setItems(context: any, data: NewsItem[]) {
      context.commit("set", data);
    },
    showItem(context: any, data: NewsItem) {
      context.commit("showItem", data);
    }
  }
};
