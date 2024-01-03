const key = "a7bafceb86b756cbdcdc04b163d81543";

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  requestFamily: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10751`,
  requestThriller: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=53`,
  requestAction: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=28`,
  requestRomance: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=10749`,
};

export default requests;
