const key = "a7bafceb86b756cbdcdc04b163d81543";

const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
  requestMovie: (id) =>
    `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`,
  requestMovieImages: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${key}&include_image_language=en`,

  requestMovieProviders: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${key}`,
  requestMovieReleaseDates: (id) =>
    `https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=${key}`,
};

export default requests;
