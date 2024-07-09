import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'tailwindcss/tailwind.css';
if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
