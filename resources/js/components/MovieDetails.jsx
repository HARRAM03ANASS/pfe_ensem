import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const baseURL = 'https://image.tmdb.org/t/p/w500'; // Adjust this base URL as needed

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`/api/movie/${id}`);
                setMovie(response.data);
            } catch (error) {
                console.error('There was an error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-center items-center h-screen">
                    <p className="text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    const backdropPath = `${baseURL}${movie.backdrop_path}`;
    const posterPath = `${baseURL}${movie.poster_path}`;

    return (
        <div
            className="container mx-auto p-4 bg-cover bg-center rounded-lg shadow-lg"
            style={{ backgroundImage: `url(${backdropPath})` }}
            
        >
            <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                <div className="flex">
                    <img
                        className="rounded-lg"
                        style={{ width: '200px', height: 'auto' }}
                        src={posterPath}
                        alt={movie.title}
                    />
                    <div className="ml-6">
                        <p className="mt-2 text-lg">{movie.description}</p>
                        <p className="mt-2 text-gray-600">Directed by: {movie.director}</p>
                        <p className="mt-2 text-gray-600">Release Date: {movie.release_date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
