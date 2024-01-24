const { Sequelize } = require ("sequelize");
const { DB }  = require ('../config');
const sequelize = new Sequelize(`postgres://${DB.user}:${DB.password}@${DB.host}/${DB.database}`, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: false,
  },
});


const database = {};

database.Sequelize = Sequelize;
database.sequelize = sequelize;

database.utilisateur = require("./utilisateur.model.js")(sequelize, Sequelize);
database.catalogue = require("./catalogue.model.js")(sequelize, Sequelize);

module.exports = database;
