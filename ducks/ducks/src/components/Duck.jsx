import PropTypes from 'prop-types';
import duck from '../assets/duck.svg';
import './Duck.css'

const Duck = ({ letter, center, className }) => {
  return (
    <div className={`duck ${className}`}>
      <img src={duck} alt={`Duck ${letter}`} className="duck-image" />
      <span
        className="duck-letter"
        style={{
          color: !center ? 'black' : 'white',
        }}
      >
        {letter}
      </span>
    </div>
  );
};

// Prop Types validation
Duck.propTypes = {
  letter: PropTypes.string.isRequired, // Validate letter prop as a required string
  center: PropTypes.bool.isRequired, // Validate center prop as a required boolean
  className: PropTypes.string,
};

export default Duck;
