import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieProviders,
  fetchMovieReleaseDates,
  fetchMovieVideos,
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
  const {
    id,
    title,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    runtime,
    tagline,
    vote_average,
  } = movieDetails;
  const extractedData = {
    id,
    title,
    backdrop_path,
    poster_path,
    overview,
    release_date,
    runtime,
    tagline,
    vote_average,
    genres: getMovieGenres(),
  };
  console.log(extractedData);
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

  let provider = null;
  if (movieProviders.US) {
    const currentCountry = movieProviders.US;
    if (currentCountry.flatrate) {
      provider = currentCountry.flatrate[0];
    } else if (currentCountry.rent) {
      provider = currentCountry.rent[0];
    } else if (currentCountry.buy) {
      provider = currentCountry.buy[0];
    }
  } else {
    provider = null;
  }

  const logoPath = provider && provider.logo_path ? provider.logo_path : null;
  const providerName =
    provider && provider.provider_name ? provider.provider_name : null;

  const extractedData = {
    logo_path: logoPath,
    provider_name: providerName,
  };
  return extractedData;
};