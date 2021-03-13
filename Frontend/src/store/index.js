import Vue from "vue";
import Vuex from "vuex";
import {userStore} from "./user-store"
import { toyService } from "../services/toy.service.js";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toys: [],
    toyForDisplay: null,
    filterBy: { name: "", inStock: "all", type: "all" },
    sortBy: { sortType: "name" },
  },
  getters: {
    toys(state) {
      return state.toys;
    },
    toyForDetails(state) {
      return state.toyForDisplay;
    },
  },
  mutations: {
    setToys(state, payload) {
      state.toys = payload.toys;
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((t) => t._id === toy._id);
      state.toys.splice(idx, 1, toy);
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
    },
    removeToy(state, { toyId }) {
      let idx = state.toys.findIndex((t) => {
        return t._id === toyId;
      });
      state.toys.splice(idx, 1);
    },
    getToyForDisplay(state, { id }) {
      let idx = state.toys.findIndex((toy) => {
        return toy._id === id;
      });
      state.toyForDisplay = state.toys[idx];
    },
    setFilter(state, payload) {
      state.filterBy.name = payload.filter.name;
      state.filterBy.type = payload.filter.type;
      if (payload.filter.inStock !== "all") {
        state.filterBy.inStock = JSON.parse(payload.filter.inStock);
      } else {
        state.filterBy.inStock = payload.filter.inStock;
      }
      toyService.setFilter(state.filterBy);
    },
    setSort(state, payload) {
      state.sortBy.sortType = payload.sort.sortType;
      toyService.setSort(state.sortBy);
    },
  },
  actions: {
    loadToys(context, payload) {
      toyService.query().then((toys) => {
        context.commit({ type: "setToys", toys });
      });
    },
    saveToy(context, payload) {
      const type = payload.toy._id ? "updateToy" : "addToy";
      return toyService.save(payload.toy).then((savedToy) => {
        context.commit({ type, toy: savedToy });
      });
    },
    removeToy(context, payload) {
      return toyService
        .remove(payload.toyId)
        .then(() =>
          context.commit({ type: "removeToy", toyId: payload.toyId })
        );
    },
    setFilter(context, payload) {
      context.commit({ type: "setFilter", filter: payload.filter });
      context.dispatch("loadToys");
    },
    setSort(context, payload) {
      context.commit({ type: "setSort", sort: payload.sort });
      context.dispatch("loadToys");
    },
  },
  modules: {
    userStore,
  },
});
