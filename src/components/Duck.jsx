import PropTypes from 'prop-types';
import duck from '../assets/duck.svg';
// import ScaleText from "react-scale-text";
import './Duck.css'

const Duck = ({ letter, center, className }) => {
  return (
    <div className={`duck ${className}`}>
      <svg width="0" height="0">
        <defs>
          <mask id="duckMask">
            <image href={duck} x="0" y="0" width="100%" height="100%" />
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
  letter: PropTypes.string.isRequired, // Validate letter prop as a required string
  center: PropTypes.bool.isRequired, // Validate center prop as a required boolean
  className: PropTypes.string,
};

export default Duck;
