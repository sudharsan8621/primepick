import './Rating.css';

const Rating = ({ value, showValue = false }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(value)) {
      stars.push(<span key={i} className="star filled">★</span>);
    } else if (i - 0.5 <= value) {
      stars.push(<span key={i} className="star half">★</span>);
    } else {
      stars.push(<span key={i} className="star empty">★</span>);
    }
  }

  return (
    <div className="rating">
      <div className="stars">{stars}</div>
      {showValue && <span className="rating-value">{value.toFixed(1)}</span>}
    </div>
  );
};

export default Rating;