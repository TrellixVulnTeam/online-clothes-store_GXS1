const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
})

const Drawer = sequelize.define('drawer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const DrawerClothes = sequelize.define('drawer_clothes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Clothes = sequelize.define('clothes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})
const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})
const ClothesInfo = sequelize.define('clothes_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Drawer)
Drawer.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Drawer.hasMany(DrawerClothes)
DrawerClothes.belongsTo(Drawer)

Type.hasMany(Clothes)
Clothes.belongsTo(Type)

Brand.hasMany(Clothes)
Clothes.belongsTo(Brand)

Clothes.hasMany(Rating)
Rating.belongsTo(Clothes)

Clothes.hasMany(DrawerClothes)
DrawerClothes.belongsTo(Clothes)

Clothes.hasMany(ClothesInfo, {as: 'info'})
ClothesInfo.belongsTo(Clothes)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Drawer,
    DrawerClothes,
    Clothes,
    Type,
    Brand,
    Rating,
    TypeBrand,
    ClothesInfo
}