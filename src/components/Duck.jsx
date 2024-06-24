import PropTypes from 'prop-types';
import '../styles/Duck.css';

const Duck = ({ letter, center, className, duckAnimate, sink }) => {
  const animationClass = duckAnimate === 1 ? 'duck-image flap' : (duckAnimate === 2 ? 'duck-image shake' : 'duck-image');
  const sinkStyle = sink !== 0 ? {
    transform: sink === 1 ? 'translateY(20%)' : 'translateY(-20%)',
    opacity: '0%',
    transition: 'transform 0.4s ease, opacity 0.4s ease'
  } : {};

  return (
    <div className={`duck ${className}`} style={sink ? sinkStyle : {}}>
      <div className={`duck-letter ${center ? 'centered' : ''}`}>
        {letter}
      </div>
      <div alt={`Duck ${letter}`} className={animationClass} />
    </div>
  );
};

Duck.propTypes = {
  letter: PropTypes.string,
  duckAnimate: PropTypes.number,
  center: PropTypes.bool,
  sink: PropTypes.number,
  className: PropTypes.string,
};

export default Duck;
