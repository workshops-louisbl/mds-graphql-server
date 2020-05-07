const { ApolloServer, gql } = require("apollo-server");

const Movies = [
  {
    id: "movie/1",
    title: "Full Metal Jacket",
    year: 1987
  },
  {
    id: "movie/2",
    title: "The Matrix",
    year: 1999
  }
]

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    year: Int
  }

  type Query {
    movie(id: ID): Movie
  }
`

const resolvers = {
  Query: {
    movie: (_, { id } ) => {
      const movie = Movies.find(movie => movie.id === id);
      return movie;
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen()
      .then(info => console.log(`server listening at ${info.url}`))
