import React from 'react';
import Member from './Member';
import members from '../data/members';

export default function Band(props) {
  const bandMembers = members.filter((m) => m.i_band === props.bandName);
  const bandMember = bandMembers.map((b) => {
    return (
      <Member
        key={b.id}
        memberId={b.id}
        memberImage={b.image}
        memberName={b.name}
      />
    );
  });

  return (
    <div className="band">
      <div className="band-logo">
        <img
          src={`https://i.bandori.party/static/img/band/${props.bandName}.png`}
          alt={props.bandName}
          className="responsive-img"
        />
      </div>
      <div className="members">{bandMember}</div>
    </div>
  );
}
