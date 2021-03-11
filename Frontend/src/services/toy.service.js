import { storageService } from "./async-storage.service.js";
// import { storageService } from './storage.service.js'
import { utilService } from "./util.service.js";
import axios from 'axios'

const KEY = "toysDB";
const TOY_URL = 'http://localhost:3030/api/toy/'

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

var gToys;

// function query() {
//   return storageService.query(KEY).then((toys) => {
//     // console.log(toys);/
//     if (!toys || !toys.length) {
//       gToys = _createToys();
//     } else {
//       gToys = toys;
//     }
//     // return gToys
//     var toysToReturn = gToys.filter((toy) => {
//       if (gFilterBy.inStock !== "all" && gFilterBy.type !== "all") {
//         console.log("gfilter ", gFilterBy.type);
//         console.log("gfilter ", gFilterBy.inStock);
//         console.log("toy ", toy.type);
//         console.log("toy ", toy.inStock);
//         return (
//           toy.name.toLowerCase().includes(gFilterBy.name.toLowerCase()) &&
//           toy.inStock === gFilterBy.inStock &&
//           toy.type === gFilterBy.type
//         );
//       } else if (gFilterBy.inStock !== "all" || gFilterBy.type !== "all") {
//         if (gFilterBy.inStock !== "all") {
//           return (
//             toy.name.toLowerCase().includes(gFilterBy.name.toLowerCase()) &&
//             toy.inStock === gFilterBy.inStock
//           );
//         }
//         if (gFilterBy.type !== "all") {
//           return (
//             toy.name.toLowerCase().includes(gFilterBy.name.toLowerCase()) &&
//             toy.type === gFilterBy.type
//           );
//         }
//       } else {
//         return toy.name.toLowerCase().includes(gFilterBy.name.toLowerCase());
//       }
//     });
//     if (gSort.sortType === "name") {
//       toysToReturn.sort((a, b) => {
//         var nameA = a.name.toUpperCase();
//         var nameB = b.name.toUpperCase();
//         if (nameA < nameB) {
//           return -1;
//         }
//         if (nameA > nameB) {
//           return 1;
//         }
//         return 0;
//       });
//     } else {
//       toysToReturn.sort((a, b) => {
//         return a.price - b.price;
//       });
//     }
//     return Promise.resolve(toysToReturn);
//   });
//   // const toys = JSON.parse(JSON.stringify(gToys))
//   // return toys;
// }

function query() {
  return axios.get(TOY_URL, { params: {filter: gFilterBy, sort:gSort}  })
        .then(res => {
              return res.data
        })
}



// function getById(id) {
//   return storageService.get(KEY, id);
//   // return gToys.find(toy => toy._id === id)
// }

function getById(id) {
  return axios.get(TOY_URL + id)
        .then(res => {
              return res.data
        })
}

// function remove(id) {
//   // const idx = gToys.findIndex(toy => toy._id === id)
//   // gToys.splice(idx, 1)
//   // storageService.store(KEY, gToys)

//   return storageService.remove(KEY, id);
// }


function remove(id) {
  return axios.delete(TOY_URL + id)
        .then(res => res.data)
}


// function save(toy) {
//   // const savedToy = (toy._id) ? _update(toy) : _add(toy)
//   // storageService.store(KEY, gToys)
//   // return savedToy;
//   const savedToy = toy._id
//     ? storageService.put(KEY, toy)
//     : storageService.post(KEY, toy);
//   return savedToy;
// }

function save(toy) {
  console.log(toy)
  if (toy._id) {
        return axios.put(TOY_URL + toy._id, toy)
              .then(res => res.data)
  } else {
        return axios.post(TOY_URL, toy)
              .then(res => res.data)
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

// {
//     _id: "t101",
//     name: "Talking Doll",
//     price: 123,
//     type: "Funny",
//     createdAt: 33321111111,
//     inStock: true,
//   },
