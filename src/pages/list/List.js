import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useLanguage } from 'utils/LanguageContext';

import Pagination from 'components/Pagination';

const getGenres = async (language) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
    params: { language }
  });
  return data.genres.reduce((acc, genre) => ({ ...acc, [genre.id]: genre.name }), {});
};

const getMoviesData = async (page, language) => {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/now_playing`, {
    headers: { Authorization: `Bearer ${process.env.REACT_APP_API_KEY}` },
    params: { language, page }
  });
  return data.results;
};

const renderStars = (vote) => {
  const fullStars = Math.round(vote / 2);
  return Array.from({ length: 5 }, (_, index) => (
    <span key={index} className={index < fullStars ? 'fullStar' : 'emptyStar'}>★</span>
  ));
};

const List = () => {
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc');
  const { language } = useLanguage();
  const totalPages = 174;

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const genresQuery = useQuery(['genres', language], () => getGenres(language));
  const moviesQuery = useQuery(['movies', page, language], () => getMoviesData(page, language), { keepPreviousData: true });

  const sortMovies = () => {
    const sortedMovies = [...moviesQuery.data].sort((a, b) => {
      if (sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    return sortedMovies;
  };

  const handleSort = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  if (genresQuery.isLoading || moviesQuery.isLoading) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  if (genresQuery.error || moviesQuery.error) {
    return <p style={{ color: "red" }}>Error loading data!</p>;
  }

  return (
    <div className='listWrap'>
      <div className='listHeader'>
        <div className='listTitle'>Now Playing Movies</div>
        <div className='sortButtons'onClick={handleSort}>
          {"Sort by ID(" +sortDirection + ")"}
        </div>
      </div>
      {sortMovies().map(movie => (
        <div className='listItem' key={movie.id}>
          <Link to={`/movie/${movie.id}`} className="listItemlink">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className='listItemText'>
              <div className='listItemTitle'>{movie.title}</div>
              <div className='listItemOverview'>{movie.overview}</div>
              <div className='listItemGenres'>
                Genres: {movie.genre_ids.map(id => genresQuery.data[id] || 'Unknown').join(', ')}
              </div>
              <div className='listItemVote'>
                Vote Average: {renderStars(movie.vote_average)}
              </div>
            </div>
          </Link>
        </div>
      ))}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default List;
