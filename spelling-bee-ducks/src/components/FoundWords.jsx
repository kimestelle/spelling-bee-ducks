import { useState } from 'react';
import PropTypes from 'prop-types';
import './FoundWords.css';
import arrow from '../assets/arrow.svg';

const FoundWords = ({ foundWords }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const sortedWords = [...foundWords].sort();


  return (
    <div className="dropdown-container">
      <img src={arrow} className={`dropdown-toggle ${isOpen ? 'up' : 'down'}`} onClick={toggleMenu}/>
      { isOpen ? 
      <>
        <p className='words-found'>
            Words you found:
        </p>
      <ul className='dropdown-list open' >
      {sortedWords.map((word , index) => (
        <li key={index}>{word.toLowerCase()}</li>
      ))}
        </ul>
        </>
      :
      <ul className='dropdown-list closed' >
        {foundWords.map((word, index) => (
          <li key={index}>{word.toLowerCase()}</li>
        ))}
      </ul>}
    </div>

  );
}

FoundWords.propTypes = {
  foundWords: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FoundWords;
