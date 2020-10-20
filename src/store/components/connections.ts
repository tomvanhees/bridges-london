import { Bridge } from "@/classes/Bridge";

export const connections = {
  namespaced: true,
  state: {
    items: [] as Bridge[],
    activeConnection: null,
    warning: null
  },
  mutations: {
    set(state: any, data: Bridge[]) {
      state.items = data;
    },
    activeConnection(state: any, data: Bridge) {
      state.activeConnection = data;
    },
    setWarning(state: any, data: string) {
      state.warning = data;
    }
  },
  actions: {
    setConnections(context: any, data: Bridge[]) {
      context.commit("set", data);
    },
    setWarning(context: any, data: string) {
      context.commit("setWarning", data);
    }
  }
};
