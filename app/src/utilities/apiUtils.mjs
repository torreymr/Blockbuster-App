import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieProviders,
  fetchMovieProvidersList,
  fetchMovieReleaseDates,
  fetchMovieVideos,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../services/apiService.mjs";

export const fetchRandomMovieIDFromList = async (data) => {
  try {
    const response = await data;
    const randomIndex = Math.floor(Math.random() * response.results.length);
    const randomMovie = response.results[randomIndex];
    const randomMovieID = randomMovie.id;
    return randomMovieID;
  } catch (error) {
    console.error("Error fetching top-rated movies:", error);
  }
};

export const getMovieDetails = async (movieIdentification) => {
  const movieId = await movieIdentification;
  const movieDetails = await fetchMovieDetails(movieId);
  const getMovieGenres = () => {
    let genres = [];
    if (movieDetails.genres) {
      const movieGenres = movieDetails.genres;
      for (let i = 0; i < movieGenres.length; i++) {
        if (movieGenres[i] && movieGenres[i].name) {
          const genre = movieGenres[i].name;
          genres.push(genre);
        }
      }
      return genres;
    } else {
      return genres;
    }
  };

  const handleMovieReleaseDate = () => {
    const movieReleaseDate = movieDetails.release_date;
    const movieReleaseDateSplit = movieReleaseDate.split("-");
    const month = movieReleaseDateSplit[1];
    const day = movieReleaseDateSplit[2];
    const year = movieReleaseDateSplit[0];

    return `${month}-${day}-${year}`;
  };

  const handleMovieRuntime = () => {
    const runtime = movieDetails.runtime;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const handleVoteAverage = () => {
    const voteAverage = movieDetails.vote_average;
    const newVoteAverage = voteAverage.toFixed(2);
    return newVoteAverage;
  };

  const { id, title, backdrop_path, poster_path, overview, tagline } =
    movieDetails;

  const extractedData = {
    id,
    title,
    backdrop_path,
    poster_path,
    overview,
    tagline,
    vote_average: handleVoteAverage(),
    genres: getMovieGenres(),
    release_date: handleMovieReleaseDate(),
    runtime: handleMovieRuntime(),
  };

  return extractedData;
};

export const getMovieTrailer = async (movieIdentification) => {
  const movieID = await movieIdentification;
  const movieVideosResponse = await fetchMovieVideos(movieID);
  const movieVideos = movieVideosResponse.results;

  let movieTrailers = [];
  for (let i = 0; i < movieVideos.length; i++) {
    const currentVideo = movieVideos[i];
    if (currentVideo.type === "Trailer") {
      movieTrailers.push(currentVideo);
    }
  }

  const extractedData = {
    key: movieTrailers[0].key,
    name: movieTrailers[0].name,
  };

  return extractedData;
};

export const getMovieDirector = async (movieIdentification) => {
  const movieID = await movieIdentification;
  const movieCredits = await fetchMovieCredits(movieID);
  const movieCrew = movieCredits.crew;
  let director;

  for (let i = 0; i < movieCrew.length; i++) {
    const currentCrewMember = movieCrew[i];
    if (currentCrewMember.job === "Director") {
      director = currentCrewMember;
      break;
    }
  }
  return director.name;
};

export const getMovieCertification = async (movieIdentification) => {
  const movieID = await movieIdentification;
  const movieReleaseDatesResponse = await fetchMovieReleaseDates(movieID);
  const movieReleaseDates = movieReleaseDatesResponse.results;
  let certification = "NR";

  for (let i = 0; i < movieReleaseDates.length; i++) {
    const currentCountry = movieReleaseDates[i];
    if (currentCountry.iso_3166_1 === "US") {
      const releaseDatesUS = currentCountry.release_dates;
      for (let i = 0; i < releaseDatesUS.length; i++) {
        const currentReleaseDate = releaseDatesUS[i];
        if (currentReleaseDate.certification !== "") {
          certification = currentReleaseDate.certification;
          break;
        }
      }
      break;
    }
  }
  return certification;
};

export const getMovieProvider = async (movieIdentification) => {
  const movieID = await movieIdentification;
  const movieProvidersResponse = await fetchMovieProviders(movieID);
  const movieProviders = movieProvidersResponse.results;

  let provider = {};
  if (movieProviders.US) {
    const currentCountry = movieProviders.US;
    if (currentCountry.flatrate) {
      provider.type = "flatrate";
      provider.logo_path = currentCountry.flatrate[0].logo_path;
      provider.name = currentCountry.flatrate[0].provider_name;
    } else if (currentCountry.free) {
      provider.type = "free";
      provider.logo_path = currentCountry.free[0].logo_path;
      provider.name = currentCountry.free[0].provider_name;
    } else if (currentCountry.rent) {
      provider.type = "rent";
      provider.logo_path = currentCountry.rent[0].logo_path;
      provider.name = currentCountry.rent[0].provider_name;
    } else if (currentCountry.buy) {
      provider.type = "buy";
      provider.logo_path = currentCountry.buy[0].logo_path;
      provider.name = currentCountry.buy[0].provider_name;
    }
  } else {
    provider = null;
  }

  return provider;
};

export const getProviderMovies = async (type, providerName, totalPages) => {
  const movies = [];
  const fetchRequests = [];

  for (let page = 1; page <= totalPages; page++) {
    fetchRequests.push(fetchTopRatedMovies(page));
  }

  const responses = await Promise.all(fetchRequests);

  for (const response of responses) {
    const popularMovies = response.results;

    for (const currentMovie of popularMovies) {
      const currentMovieID = currentMovie.id;
      const movieProvidersResponse = await fetchMovieProviders(currentMovieID);
      const movieProviders = movieProvidersResponse.results;
      const movieProvidersUS = movieProviders.US;

      if (movieProvidersUS && movieProvidersUS[type]) {
        const currentMovieProviders = movieProvidersUS[type];
        for (const provider of currentMovieProviders) {
          if (provider.provider_name === providerName) {
            const alreadyAdded = movies.some(
              (movie) => movie.id === currentMovieID
            );
            if (!alreadyAdded) {
              const currentMovieDetails = await getMovieDetails(currentMovieID);
              movies.push(currentMovieDetails);
            }
            break;
          }
        }
      }
    }
  }

  return movies;
};

export const getProviderIcon = async (providerName = "Netflix") => {
  const movieProvidersResponse = await fetchMovieProvidersList();
  const movieProviders = movieProvidersResponse.results;
  for (let i = 0; i < movieProviders.length; i++) {
    const currentProvider = movieProviders[i];

    if (currentProvider.provider_name === providerName) {
      return currentProvider.logo_path;
    }
  }
};
