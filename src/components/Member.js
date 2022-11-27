import React from 'react';
import { Link } from 'react-router-dom';

export default function Member(props) {
  return (
    <Link to={`/characters/${props.memberId}`} className="member">
      <img
        src={props.memberImage}
        alt={props.memberName}
        className="responsive-img"
      />
      <div className="member-name">{props.memberName}</div>
    </Link>
  );
}
