import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import members from '../data/members';
import Detail from '../components/Detail';

export default function CharacterDetail() {
  const { id } = useParams();
  const member = members.find((m) => m.id == id);

  useEffect(() => {
    document.title = `${member.name} - ${member.i_band}`;
  }, []);

  const detailsArray = [
    {
      class: 'name',
      text: 'Name',
      value: (
        <>
          <div className="romaji">{member.name}</div>
          <div className="japanese">{member.japanese_name}</div>
        </>
      ),
    },
    {
      class: 'band',
      text: 'Band',
      value: (
        <img
          src={`https://i.bandori.party/static/img/band/${member.i_band}.png`}
          alt={member.i_band}
        />
      ),
    },
    {
      class: 'school',
      text: 'School',
      value: member.school,
    },
    {
      class: 'school-year',
      text: 'School year',
      value: member.i_school_year,
    },
    {
      class: 'cv',
      text: 'CV',
      value: (
        <>
          <div className="romaji">{member.romaji_CV}</div>
          <div className="japanese">{member.CV}</div>
        </>
      ),
    },
    {
      class: 'birthday',
      text: 'Birthday',
      value: dayjs(member.birthday).format('MMMM D'),
    },
    {
      class: 'food-like',
      text: 'Liked food',
      value: member.food_like,
    },
    {
      class: 'food-dislike',
      text: 'Disliked food',
      value: member.food_dislike,
    },
    {
      class: 'astrological-sign',
      text: 'Astrological sign',
      value: member.i_astrological_sign,
    },
    {
      class: 'instrument',
      text: 'Instrument',
      value: member.instrument,
    },
    {
      class: 'description',
      text: 'Description',
      value: member.description,
    },
  ];

  const details = detailsArray.map((d) => {
    return (
      <Detail key={d.class} class={d.class} text={d.text} value={d.value} />
    );
  });

  return (
    <div className="character-detail">
      <figure className="character-img">
        <img src={member.image} alt={member.name} className="responsive-img" />
      </figure>
      <div className="info">
        <div className="detail">{details}</div>
      </div>
    </div>
  );
}
