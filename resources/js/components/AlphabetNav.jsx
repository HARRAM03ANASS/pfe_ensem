import React from 'react';

const AlphabetNav = ({ onLetterClick }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="flex justify-center mt-4">
            {alphabet.map(letter => (
                <button
                    key={letter}
                    onClick={() => onLetterClick(letter)}
                    className="px-3 py-1 mx-1 border rounded bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
                >
{` ${letter}`}                
                </button>
            ))}
        </div>
    );
};

export default AlphabetNav;
