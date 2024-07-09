import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlphabetNav from './AlphabetNav';
import { Link } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [user, setUser] = useState(null);
    const [token,setToken]=useState(localStorage.getItem('ACCESS_TOKEN'));

    
    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        axios.get('/api/user', {
            headers: {
                'Authorization': `Bearer ${token}`            
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the user data!', error);
        });
    };
    const fetchMovies = async () => {
        try {
            if (debouncedSearchTerm[0] !== '') {
                const response = await axios.get(`api/search/${debouncedSearchTerm[0]}/movies`, { params: { letter: selectedLetter } });
                setMovies(response.data);
            } else {
                const response = await axios.get('/api/movies', { params: { letter: selectedLetter } });
                setMovies(response.data);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    useEffect(() => {
        fetchMovies();
        fetchUser();
    }, [selectedLetter, debouncedSearchTerm[0]]);

    const handleLetterClick = (letter) => {
        setSelectedLetter(letter);
    };
    return (
        <div className="container mx-auto px-4">
            <Link>
            
            </Link>
            <a href="/">               
                 <h1 className="text-2xl font-bold mb-4 ">Movies</h1>
            </a>
            {user && (
                    <h3 className="mb-4">ur connected ,{user.name}</h3>
                )}
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}
                    placeholder='Search...'
                    className="p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="w-full mt-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                     {movies.map(movie => (
                        movie.poster_path && (
                            <li key={movie.api_id} className="bg-white p-4 rounded shadow ">
                                <h2 className="text-xl font-semibold">{movie.title}</h2>
                                <p className="mt-2">{movie.description}</p>
                                <p className="mt-2 text-cyan-700 font-extrabold">Directed by: {movie.director}</p>
                                <p className="mt-2 text-gray-600">Release Date: {movie.release_date}</p>
                                <Link to={`movie/${movie.api_id}`}>
                                    <img
                                        className="mt-4 w-full rounded-lg"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                </Link>
                            </li>
                        )
                    ))}
                </ul>
            </div>
            <div className='bg-green-500 mt-4'>
                <AlphabetNav onLetterClick={handleLetterClick} />
            </div>
        </div>
    );
};

export default Movies;
