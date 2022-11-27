import React from 'react';

export default function CardRarity(props) {
  return (
    <span className="star">
      <img
        src={`https://i.bandori.party/static/img/${
          props.stat === 2 ? 'star_trained' : 'star_untrained'
        }.png`}
        alt={props.stat === 2 ? 'Trained Star' : 'Star'}
      />
    </span>
  );
}
