// src/components/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`/api/search/${query}/movies`);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        if (query) {
            fetchMovies();
        }
    }, [query]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {movies.map(movie => (
                    <li key={movie.api_id} className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{movie.title}</h2>
                        <p className="mt-2">{movie.description}</p>
                        <p className="mt-2 text-gray-600">Directed by: {movie.director}</p>
                        <p className="mt-2 text-gray-600">Release Date: {movie.release_date}</p>
                        <Link to={`/movie/${movie.api_id}`}>
                            <img
                                className="mt-4 w-full rounded"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
