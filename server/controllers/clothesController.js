const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Clothes, ClothesInfo} = require('../models/models')


class ClothesController {
    async create (req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', filename))
            const clothes = await Clothes.create({name, price, brandId, typeId, img: filename})

            if(info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    ClothesInfo.create({
                        title: i.title,
                        description: i.description,
                        clothesId: clothes.id
                    })
                })
            }

            return  res.json(clothes)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async fetchAll (req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let clothes;
        if(!brandId && !typeId) {
            clothes = await Clothes.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId) {
            clothes = await Clothes.findAndCountAll({where: {brandId}, limit, offset})
        }
        if(!brandId && typeId) {
            clothes = await Clothes.findAndCountAll({where: {typeId}, limit, offset})
        }
        if(brandId && typeId) {
            clothes = await Clothes.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }
        return res.json(clothes)

    }

    async fetchOne (req, res) {
        const {id} = req.params
        const clothes = await Clothes.findOne(
            {
                where: {id},
                include: [{model: ClothesInfo, as: 'info'}]
            }
        )
        return res.json(clothes)
    }
}

module.exports = new ClothesController()