const express = require('express')
const {log} = require('../../middlewares/logger.middleware')
const {requireAuth, requireAdmin} =  require('../../middlewares/requireAuth.middleware')
const router = express.Router()
const { getToys, getToyById, addToy,updateToy,removeToy} = require('./toy.controller')

// router.get('/', log,  getToys)
// router.get('/:toyId', log, getToyById)
// router.post('/', log, requireAuth, requireAdmin, addToy)
// router.put('/:toyId', log, requireAuth, requireAdmin, updateToy)
// router.delete('/:toyId', log, requireAuth, requireAdmin, removeToy)

router.get('/', log,  getToys)
router.get('/:toyId', log, getToyById)
router.post('/', log, requireAdmin, addToy)
router.put('/:toyId', log, requireAdmin, updateToy)
router.delete('/:toyId', log, requireAdmin, removeToy)




module.exports = router