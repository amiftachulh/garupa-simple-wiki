import React from 'react';

export default function Detail(props) {
  return (
    <div className={props.class}>
      <div className="text">{props.text}</div>
      <div className="value">{props.value}</div>
    </div>
  );
}
