const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data.db"
})

const Movie = sequelize.define("movies", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING
  },
  year: {
    type: Sequelize.INTEGER
  },
  pitch: {
    type: Sequelize.TEXT
  }
})

sequelize.sync({ force: true });

module.exports = {
  Movie
}
