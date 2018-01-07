var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, './', '../config/'))[env];

var db = [];

config.databases.databases_empresas.forEach((db_item)=>{
    var sequelize = new Sequelize( db_item.config_connection.name, db_item.config_connection.user, db_item.config_connection.pass, {
        host: db_item.config_connection.host,
        port: db_item.config_connection.port,
        dialect: db_item.config_connection.dialect,  
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });
    
    var item_db = {};

    fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf(".") !== 0) && (file !== "index.js") && (file.indexOf(".js") !== -1);
    })
    
    
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        item_db[model.name] = model;
    });



    Object.keys(item_db).forEach((modelName) => {
        if ("associate" in item_db[modelName]) {
             item_db[modelName].associate(item_db);
         }
    }); 

    item_db.nombre = db_item.nombre.toString().toLowerCase();    
    item_db.sequelize = sequelize;
    item_db.Sequelize = Sequelize;

    db.push(item_db);
});

module.exports = db;