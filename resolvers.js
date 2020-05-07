const { v4: uuidV4 } = require("uuid");


const resolvers = {
  Query: {
    allMovies: (_, __, ctx) => {
      const movies = ctx.db.Movie.findAll();
      return movies;
    },
    movie: async (_, { id }, ctx ) => {
      const movie = await ctx.db.Movie.findByPk(id);

      const title = movie.get("title");
      const imdbData = await ctx.omdb.fetchOmdbData(title);
      const rating = imdbData.imdbRating;

      return {
        ...movie.get({ plain: true}),
        rating
      };
    }
  },
  Mutation: {
    addMovie: async (_, { title, year }, ctx) => {
      const movie = await ctx.db.Movie.create({
        id: `movies/${uuidV4()}`,
        title,
        year
      })

      return movie.get({plain: true});
    },
    removeMovie: async (_, { id }, ctx) => {
      const movie = await ctx.db.Movie.findByPk(id)

      movie.destroy();

      return movie.get({ plain: true});
    }
  }
}

module.exports = resolvers;
