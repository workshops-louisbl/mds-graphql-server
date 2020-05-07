const axios = require("axios");

async function fetchOmdbData(title) {
  const url = `https://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`;
  const imdbData = await axios(url);

  return imdbData.data;
}

module.exports = {
  fetchOmdbData
}
