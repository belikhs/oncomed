import React from 'react';
import './Detail.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useLanguage } from 'utils/LanguageContext';

const fetchMovieDetail = async (movieId, language) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
    params: { language }
  });
  return data;
};

const Detail = () => {
  const { movieId } = useParams();
  const { language } = useLanguage();
  const { data: movie, isLoading, error } = useQuery(['movieDetail', movieId, language], () => fetchMovieDetail(movieId, language));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error occurred: {error.message}</p>;
  }

  if (!movie) {
    return <p>No movie data available.</p>;
  }

  return (
    <div className={`movie-detail-container`}>
      <div className="header">
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className="info">
          <div>{movie.title}</div>
          <div className="tagline">{movie.tagline}</div>
          <div>{movie.overview}</div>
        </div>
      </div>
      <div className="additional-info">
        <div className="sub-info">
          <div>{language === 'en-US' ? 'Release Date' : '개봉일'}: {movie.release_date}</div>
          <div>{language === 'en-US' ? 'Runtime' : '런타임'}: {movie.runtime} minutes</div>
          <div>{language === 'en-US' ? 'Genres' : '장르'}: {movie.genres.map(genre => genre.name).join(', ')}</div>
          <div className="rating">{language === 'en-US' ? 'Rating' : '평점'}: {movie.vote_average} ({movie.vote_count} votes)</div>
        </div>
        <div className="sub-info">
          <div>{language === 'en-US' ? 'Budget' : '예산'}: ${movie.budget.toLocaleString()}</div>
          <div>{language === 'en-US' ? 'Revenue' : '수익'}: ${movie.revenue.toLocaleString()}</div>
          <div>{language === 'en-US' ? 'Production Countries' : '제작 국가'}: {movie.production_countries.map(country => country.name).join(', ')}</div>
          <div>{language === 'en-US' ? 'Spoken Languages' : '언어'}: {movie.spoken_languages.map(lang => lang.name).join(', ')}</div>
        </div>
        {movie.belongs_to_collection && (
          <div className="collection-info">
            <img src={`https://image.tmdb.org/t/p/w500${movie.belongs_to_collection.poster_path}`} alt={movie.belongs_to_collection.name} />
            <div>{language === 'en-US' ? 'Part of the ' : ''}{movie.belongs_to_collection.name} {language === 'en-US' ? 'series' : '시리즈'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
