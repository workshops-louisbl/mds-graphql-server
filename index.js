require('dotenv').config();
const { v4: uuidV4 } = require("uuid");
const axios = require("axios");
const Sequelize = require("sequelize");
const { ApolloServer, gql } = require("apollo-server");

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
})

sequelize.sync();

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    year: Int
    rating: String
  }

  type Query {
    allMovies: [Movie]
    movie(id: ID): Movie
  }

  type Mutation {
    removeMovie(id: ID!): Movie
    addMovie(title: String!, year: Int): Movie
  }
`

const resolvers = {
  Query: {
    allMovies: () => {
      const movies = Movie.findAll();
      return movies;
    },
    movie: async (_, { id } ) => {
      const movie = await Movie.findByPk(id);

      const title = movie.get("title");
      const url = `https://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`;
      const imdbData = await axios(url);
      // console.log("imdbData: ", imdbData.data);
      const rating = imdbData.data.imdbRating;

      return {
        ...movie.get({ plain: true}),
        rating
      };
    }
  },
  Mutation: {
    addMovie: async (_, { title, year }) => {
      const movie = await Movie.create({
        id: `movies/${uuidV4()}`,
        title,
        year
      })

      return movie.get({plain: true});
    },
    removeMovie: async (_, { id }) => {
      const movie = await Movie.findByPk(id)

      movie.destroy();

      return movie.get({ plain: true});
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen()
      .then(info => console.log(`server listening at ${info.url}`))
