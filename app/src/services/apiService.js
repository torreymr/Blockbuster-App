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
    return response.data.results;
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
