const logger = require('../../services/logger.service')
const toyService = require('./toys.service')



async function getToys(req, res) {
    
  
    try {
        const toys = await toyService.query(req.query)
    
        res.json(toys)
    } catch (err) {
        logger.error('Cannot get toys', err)
        res.status(500).send({
            err: 'Failed to get toys'
        })
    }
}

// Get a single toy by id
async function getToyById(req, res) {
    try {
        const toyId = req.params.toyId
        const toy = await toyService.getById(toyId)
        res.json(toy)

    } catch (err) {
        logger.error('Cannot get toy by id', err)
        res.status(500).send({ 
            err: 'Failed to get toy by id'
        })
    }
}

// add a new toy

async function addToy(req, res) {
    try{
        const {name, price, type, inStock} = req.body
    const createdAt= new Date(Date.now())
        const toy = {name , price, type, inStock, createdAt}
        const savedToy = await toyService.add(toy) 
        res.json(savedToy)
    }
    catch (err){
        logger.error('Cannot add toy ', err)
        res.status(500).send({
            err: 'Failed to add toy'})
    }
}


async function updateToy (req, res) {
    try{
        const {name, price, type,inStock,_id} = req.body
        const toy = { name, price, type,inStock, _id}
        const savedToy = await toyService.update(toy)
        res.json(savedToy)
    }
    catch(err){
        res.status(500).send('cannot update toy')
    }
}

// remove toy by id
async function removeToy (req, res) {
    // const {nickname} = req.cookies
    try{
        const toyId = req.params.toyId
        await toyService.remove(toyId)
        res.json('Deleted...')
    }
    catch(err){
        res.status(500).send(err)
    }
    }

function _createToy(name) {
    return {
        _id: utilService.makeId(),
        name,
        price: 0,
        type: "regular",
        createdAt: Date.now(),
        inStock: true
    };
}

module.exports = {
    getToys,
    getToyById,
    addToy,
    updateToy,
    removeToy
}