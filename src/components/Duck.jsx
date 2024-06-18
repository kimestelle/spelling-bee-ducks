import PropTypes from 'prop-types';
import duck from '../assets/duck.svg';
import './Duck.css'

const Duck = ({ letter, center, className }) => {
  return (
    <div className={`duck ${className}`}>
      <svg width="0" height="0">
        <defs>
          <mask id="duckMask" maskContentUnits="objectBoundingBox">
              <path d="M234.95,109c-2-23-11-41-11-41l-14,13s-38-6-60-6c-18.03,0-34,4-34,4,0,0,6-11,6-29C121.95,23.81,101.95,0,68.95,0,46.95,0,26.95,17,28.36,37.07c-.4-.08-.82-.12-1.25-.12-3.66,0-6.63,2.97-6.63,6.63,0,.89.18,1.73.49,2.51L2.64,55.77c-4.35,2.3-2.87,7.16,1.17,9.96,6.15,4.26,25.15,7.26,25.15,7.26,0,0-12.33,31.47-13,56-.7,25.52,5.39,39.66,20,57,16,19,46,36,91.86,36.36.77,0,1.53,0,2.29-.01,1.94-.03,3.87-.11,5.78-.24,11.97-.84,23.48-3.74,34.15-8.32,9.13-3.92,17.66-9.07,25.33-15.23,26.31-21.11,42.67-54.04,39.58-89.55Z"/>
          </mask>
        </defs>
      </svg>
      <img src={duck} alt={`Duck ${letter}`} className="duck-image" />

      <div style={{ color: !center ? 'black' : 'white' }} className="duck-letter">
          {letter}
      </div>
    </div>
  );
};

Duck.propTypes = {
  letter: PropTypes.string.isRequired, 
  center: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Duck;
