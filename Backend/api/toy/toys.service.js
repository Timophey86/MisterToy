const gToys = require("../../data/toy.json");

module.exports = {
  query,
  getById,
  remove,
  save,
};

/* Get List Of toys */
function query(filterBy) {
  // filter name, type and stock
  // const regex = new RegExp(filterBy.name, 'i')
  // var toysForDisplay = gToys.filter(toy => {
  //       return regex.test(toy.name) && toy.type === filterBy.typeFilter || filterBy.typeFilter === 'all'
  //             && JSON.stringify(toy.inStock) === filterBy.stockFilter || filterBy.stockFilter === 'all'
  // })

  var gFilterBy = JSON.parse(filterBy.filter);
  var gSortBy = JSON.parse(filterBy.sort);

  var toysToReturn = gToys.filter((toy) => {
    if (gFilterBy.inStock !== "all" && gFilterBy.type !== "all") {
      console.log("gfilter ", gFilterBy.type);
      console.log("gfilter ", gFilterBy.inStock);
      console.log("toy ", toy.type);
      console.log("toy ", toy.inStock);
      return (
        toy.name.toLowerCase().includes(gFilterBy.name.toLowerCase()) &&
        toy.inStock === gFilterBy.inStock &&
        toy.type === gFilterBy.type
      );
    } else if (gFilterBy.inStock !== "all" || gFilterBy.type !== "all") {
      if (gFilterBy.inStock !== "all") {
        return (
          toy.name.toLowerCase().includes(gFilterBy.name.toLowerCase()) &&
          toy.inStock === gFilterBy.inStock
        );
      }
      if (gFilterBy.type !== "all") {
        return (
          toy.name.toLowerCase().includes(gFilterBy.name.toLowerCase()) &&
          toy.type === gFilterBy.type
        );
      }
    } else {
      return toy.name.toLowerCase().includes(gFilterBy.name.toLowerCase());
    }
  });

  if (gSortBy.sortType === "name") {
    toysToReturn.sort((a, b) => {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  } else {
    toysToReturn.sort((a, b) => {
      return a.price - b.price;
    });
  }

  return Promise.resolve(toysToReturn);
}

/* Get toy By Id */
function getById(toyId) {
  const currToy = gToys.find((toy) => toy._id === toyId);
  return Promise.resolve(currToy);
}

/* Remove toy */
function remove(toyId) {
  const idx = gToys.findIndex((toy) => toy._id === toyId);
  gToys.splice(idx, 1);
  return _saveToysToFile();
}

/* Add / update toy */
function save(toy) {
  if (toy._id) {
    const idx = gToys.findIndex((t) => t._id === toy._id);
    if (idx < 0) return Promise.reject("No such toy", toy._id);
    gToys.splice(idx, 1, toy);
  } else {
    toy._id = _makeId();
    toy.createdAt = new Date();
    gToys.unshift(toy);
  }
  return _saveToysToFile().then(() => toy);
}

//update toys DB
function _saveToysToFile() {
  return new Promise((resolve, reject) => {
    const fs = require("fs");
    fs.writeFile("data/toy.json", JSON.stringify(gToys, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

//utils make id
function _makeId(length = 5) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
