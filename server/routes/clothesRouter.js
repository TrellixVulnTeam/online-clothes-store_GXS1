const Router = require('express')
const router = new Router()
const clothesController = require('./../controllers/clothesController')

router.post('/', clothesController.create)
router.get('/', clothesController.fetchAll)
router.get('/:id', clothesController.fetchOne)

module.exports = router