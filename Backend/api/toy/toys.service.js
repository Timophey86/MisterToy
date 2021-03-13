const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


async function query(filterBy) {

    console.log('trying to get toys')
    const criteria = _buildCriteria(filterBy);
    
    try{
        const collection = await dbService.getCollection('toys') //bring the collection
        var toys = await collection.find(criteria).toArray()
        // console.log(toys, 'service')
        return toys

        // const regex = new RegExp(filterBy.name, 'i')
        // var toysForDisplay = gToy.filter(toy => {
        //       return regex.test(toy.name) && (toy.type === filterBy.type || filterBy.type === 'all')
        //             && (JSON.stringify(toy.inStock) === filterBy.inStock || filterBy.inStock === 'all')  
    }
    catch(err){
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById (id){
    try{
        const collection = await dbService.getCollection('toys') //bring the collection
        const toy = await collection.findOne({"_id":ObjectId(id)})
        return toy
    }
    catch(err){
        logger.error('cannot find toy by id', err)
        throw err
    }
}

async function remove (id){
    try{
        const collection = await dbService.getCollection('toys') //bring the collection
        const query = { _id: ObjectId(id) }
        await collection.deleteOne(query)
    }
    catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy){
    try{
        const collection = await dbService.getCollection('toys') //bring the collection
        await collection.insertOne(toy)
        return toy

        
    }
    catch(err){
        logger.error('cannot insert toy', err)
        throw err
    }

}

async function update (toy){
    try{
        const collection = await dbService.getCollection('toys') //bring the collection
        const toyToAdd = {
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock:toy.inStock
        }
            await collection.updateOne({"_id":ObjectId(toy._id)}, {$set:toyToAdd})
            return toy
        }
        catch(err){
            logger.error('cannot insert toy', err)
            throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.name =txtCriteria
    }
    if (filterBy.type !== 'all') {
        criteria.type = filterBy.type
    }
    if(filterBy.inStock !=='all'){
        
        criteria.inStock = JSON.parse(filterBy.inStock)
    }
    return criteria
}





module.exports = {
  query,
  getById,
  remove,
  add,
  update
}


