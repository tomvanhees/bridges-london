import {NewsItem} from "@/classes/NewsItem";
import index from "@/store";

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
        },
        add(state: any, data: NewsItem) {
            state.items.push(data);
        },
        update(state: any, data: { index: number, data: NewsItem }) {
            state.items.splice(index, 1, data);
        }
    },
    actions: {
        setItems(context: any, data: NewsItem[]) {
            context.commit("set", data);
        },
        showItem(context: any, data: NewsItem) {
            context.commit("showItem", data);
        },
        updateItem(context: any, data: NewsItem) {
            const index = context.state.items.findIndex((item: NewsItem) => item.id === data.id)

            index === -1 ?
                context.commit('add', data) :
                context.commit('update', {index: index, data: data})
        }
    }
};
