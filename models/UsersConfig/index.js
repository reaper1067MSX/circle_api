var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, './', '../../config/'))[env];

var sequelize_users = new Sequelize( config.databases.database_users.name, config.databases.database_users.user, config.databases.database_users.pass, {
    host: config.databases.database_users.host ,
    port: config.databases.database_users.port,
    dialect: config.databases.database_users.dialect,  
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

var db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize_users.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize_users;
db.Sequelize = Sequelize;

module.exports = db;