require('dotenv').config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const database = require("./database");
const omdbApi = require("./omdbApi");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    omdb: omdbApi,
    db: database
  }
});

server.listen()
      .then(info => console.log(`server listening at ${info.url}`))
