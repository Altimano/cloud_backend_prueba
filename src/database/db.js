const { Sequelize, DataTypes } = require('sequelize');

// DEFINIR LOS ESQUEMAS
const productModel = require('./models/products');
const track_inventoryModel = require('./models/track_inventory');
const carriersModel = require('./models/carriers');
const guidesModel = require('./models/guides');
//const inventoryModel = require('./models/inventory');

sslopt = {}
 
if (process.env.NODE_ENV !== 'development') {
    sslopt = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
}
//Tienen que crear un env con los datos de sus dbs
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    protocol: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: sslopt,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
})



sequelize.authenticate().then(() => {
    console.log('Database Connected');
}) .catch((error) => {
    console.log(error)
    console.log('Error while trying connecting to Database')
})

//Se crean las tablas
const Products = productModel(sequelize, DataTypes);
const Carriers = carriersModel(sequelize, DataTypes);
const Guides = guidesModel(sequelize, DataTypes);
const Track_inventory = track_inventoryModel(sequelize, DataTypes); 
//const Inventory = inventoryModel(sequelize, DataTypes);


sequelize.sync({alter: true}).then(() => {
    console.log('Database && tables was synchronized!')
}).catch((e) => {
    console.log(e)
    console.log('Error while trying connecting to Database')
});

module.exports = {
    Products,
    Carriers,
    Guides,
    Track_inventory,
    //Inventory
}