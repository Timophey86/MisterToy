import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";
import { httpService } from "./http.service.js";

const KEY = "toysDB";
const TOY_URL = "http://localhost:3030/api/toy/";

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
  setFilter,
  setSort,
};

var gFilterBy = { name: "", inStock: "all", type: "all" };
var gSort = { sortType: "name" };

function setFilter(filter) {
  gFilterBy = filter;
}

function setSort(sort) {
  gSort = sort;
}

function query(filterBy = {name: gFilterBy.name,type: gFilterBy.type,inStock: gFilterBy.inStock}) {
  return httpService.get(`toy?name=${filterBy.name}&type=${filterBy.type}&inStock=${filterBy.inStock}`)
}

function getById(id) {
  return httpService.get(`toy/${id}`);
}

function remove(id) {
  return httpService.delete(`toy/${id}`);
}

function save(toy) {
  if (toy._id) {
    return httpService.put(`toy/${toy._id}`, toy);
  } else {
    return httpService.post(`toy`, toy);
  }
}

function getEmptyToy() {
  return {
    name: "",
    price: null,
    inStock: true,
    type: "Funny",
    _id: "",
  };
}

function _createToys() {
  return storageService.query(KEY).then((toys) => {
    if (!toys || !toys.length) {
      toys = [
        _createToy("Shaking Ball"),
        _createToy("Mr. Potato Snake"),
        _createToy("Funny Rope"),
      ];

      localStorage.setItem(KEY, JSON.stringify(toys));
    }
    return toys;
  });
}

function _createToy(text) {
  return {
    name: text,
    price: utilService.getRandomInt(10, 120),
    inStock: true,
    type: "Funny",
    _id: utilService.makeId(),
  };
}
