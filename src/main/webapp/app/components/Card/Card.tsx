import React from 'react';
import './card.css';

const Card = props => {
  return (
    <>
      <div className="cat-card">
        <img className="product--image" src={props.url} alt={props.name} />
        <div className="title-price">
          <h5>{props.name}</h5>
          <p className="price">{props.price}</p>
        </div>
        <p>{props.desc}</p>
        <p>
          <button>Add to Cart</button>
        </p>
      </div>
    </>
  );
};

export default Card;
