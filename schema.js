const { gql } = require("apollo-server");

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    year: Int
    pitch: String
    imdbData: Imdb
  }

  type Imdb {
    imdbRating: String
    Poster: String
    Director: String
    Genre: String
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

module.exports = typeDefs;
