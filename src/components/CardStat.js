import React from 'react';

export default function CardStat(props) {
  return (
    <div className={props.class}>
      <div className="text">{props.text}</div>
      <div className="data">
        <div className="progress" style={{ width: `${props.progress}%` }}>
          <div className="value">{props.value}</div>
        </div>
      </div>
    </div>
  );
}
