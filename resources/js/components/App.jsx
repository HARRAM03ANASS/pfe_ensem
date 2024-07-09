import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import SearchResults from './SearchResults';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/search" element={<SearchResults />} />
            </Routes>
        </Router>
    );
};

export default App;
