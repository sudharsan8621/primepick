import './Loader.css';

const Loader = ({ size = 'medium' }) => {
  return (
    <div className={`loader-container ${size}`}>
      <div className="loader">
        <div className="loader-ring"></div>
        <span className="loader-text">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;