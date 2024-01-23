import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "a7bafceb86b756cbdcdc04b163d81543",
  },
});

export const fetchMovies = async (endpoint) => {
  try {
    const response = await tmdbApi.get(endpoint);
    return response.data;
  } catch (error) {
    console.log("Error!");
    throw error;
  }
};

// Function to fetch Popular Movies
export const fetchPopularMovies = async () => {
  return fetchMovies("/movie/popular");
};

// Function to fetch Trending Movies
export const fetchTrendingMovies = async () => {
  return fetchMovies("/trending/movie/week");
};

// Function to fetch upcoming movies
export const fetchUpcomingMovies = async () => {
  return fetchMovies("/movie/upcoming");
};

// Function to fetch top rated movies
export const fetchTopRatedMovies = async (queryParams = {}) => {
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");

  const endpoint = `/movie/top_rated?${queryString}`;

  return fetchMovies(endpoint);
};

// Function to fetch Movie Images
// export const fetchMovieImages = async (queryParams = {}, movieID = null) => {
//   const queryString = Object.keys(queryParams)
//     .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
//     .join("&");
//   const endpoint = `/movie/${movieID}/images${queryString}`;
//   return fetchMovies(endpoint);
// };

// Function to fetch Movie details
export const fetchMovieDetails = async (queryParams = {}, movieID = null) => {
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${encodeURIComponent(queryParams[key])}`)
    .join("&");

  const endpoint = `/movie/${movieID}?${queryString}`;

  return fetchMovies(endpoint);
};

// Function to fetch movie certification
export const fetchMovieReleaseDates = async (movieID = null) => {
  const endpoint = `/movie/${movieID}/release_dates`;
  return fetchMovies(endpoint);
};

// Function to fetch movie providers

export const fetchMovieProviders = async (movieID = null) => {
  const endpoint = `/movie/${movieID}/watch/providers`;
  return fetchMovies(endpoint);
};
