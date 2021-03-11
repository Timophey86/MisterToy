const express = require('express')
const toyService = require('./toys.service')
const router = express.Router()
const gToys = require('../../data/toy.json');
const { json } = require('body-parser');

/* toy API CONTROLLER */

//Get toy List
router.get('/', (req, res) => {

    //   const filterBy ={
    //         name: req.query.name || '',
    //         stockFilter: req.query.stockFilter || 'all',
    //         typeFilter: req.query.typeFilter || 'all',
    //         sortBy: req.query.sortBy || 'name',
    //   }

      const filterBy = req.query;
      

      toyService.query(filterBy)
            .then(toys => {
                //   console.log(toys)
                  res.json(toys)
            })
})

//Get single toy
router.get('/:toyId', (req, res) => {
      const toyId = req.params.toyId;
      toyService.getById(toyId)
            .then(toy => {
                  res.json(toy)
            })
})

//Remove toy 
router.delete('/:toyId', (req, res) => {
      const toyId = req.params.toyId;
      toyService.remove(toyId)
            .then(() => {
                  res.json('current toy delete')
            })
            .catch((err) => {
                  console.log('Cannot remove toy', err)
                  res.status(401).send('Cannot remove toy')
            })
})

// Add toy
router.post('/', (req, res) => {
      const { name, price, type, inStock } = req.body
      const newtoy = { name, price, type, inStock }
      toyService.save(newtoy)
            .then((savedtoy) => {
                  console.log('Added toy:', savedtoy);
                  res.json(savedtoy)
            })
            .catch((err) => {
                  console.log('Cannot add toy', err)
                  res.status(401).send('Cannot add toy')
            })
})

//Update toy
router.put('/:toyId', (req, res) => {

      const toyId = req.params.toyId;
      const foundToy = gToys.find((toy) => {return toy._id === toyId})
      var { name, price, type, inStock } = req.body
      if(inStock ===  undefined){inStock=foundToy.inStock}
      const newtoy = { _id: toyId, name, price, type, inStock, createdAt: foundToy.createdAt}

      toyService.save(newtoy)
            .then((savedtoy) => {
                  console.log('Updated toy:', savedtoy);
                  res.json(savedtoy)
            })
            .catch((err) => {
                  console.log('you cant update toy', err)
                  res.status(401).send('you cant update the toy')
            })
})


module.exports = router