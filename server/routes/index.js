const Router = require('express')
const router = new Router()
const clothesRouter = require('./clothesRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const brandRoutes = require('./brandRoutes')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRoutes)
router.use('/clothes', clothesRouter)

module.exports = router