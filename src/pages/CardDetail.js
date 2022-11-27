import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Preloader from '../components/Preloader';
import members from '../data/members';
import CardRarity from '../components/CardRarity';
import CardStat from '../components/CardStat';
import Detail from '../components/Detail';

export default function CardDetail() {
  const { id } = useParams();
  const [data, setData] = useState('');
  const [isTrained, setIsTrained] = useState(false);
  const [stat, setStat] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(`https://bandori.party/api/cards/${id}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
      setIsLoading(false);
    };
    fetchData();
    if (data)
      document.title =
        data.name === null
          ? `${data.japanese_name} - ${member.name}`
          : `${data.name} - ${member.name}`;
  }, [data.name]);

  // Stat value
  let performance, technique, visual;
  switch (stat) {
    case 0:
      performance = data.performance_min;
      technique = data.technique_min;
      visual = data.visual_min;
      break;
    case 1:
      performance = data.performance_max;
      technique = data.technique_max;
      visual = data.visual_max;
      break;
    case 2:
      performance = data.performance_trained_max;
      technique = data.technique_trained_max;
      visual = data.visual_trained_max;
  }

  // Member
  let member;
  if (!data) return;
  else member = members.find((m) => m.id === data.member);

  // Stars rarity
  const rarityValue = data.i_rarity;
  const rarity = [...Array(rarityValue)].map((e, i) => {
    return <CardRarity key={i} stat={stat} />;
  });

  // Determine the attribute icon
  let attributeIcon;
  switch (data.i_attribute) {
    case 'Power':
      attributeIcon = 1;
      break;
    case 'Cool':
      attributeIcon = 2;
      break;
    case 'Pure':
      attributeIcon = 3;
      break;
    case 'Happy':
      attributeIcon = 4;
  }

  // Progress bar
  const total = 15000;
  const performancePercent = (performance / total) * 100;
  const techniquePercent = (technique / total) * 100;
  const visualPercent = (visual / total) * 100;
  const overall = performance + technique + visual;
  const overallPercent = (overall / 35000) * 100;

  // Stat element
  const statsArray = [
    {
      class: 'performance',
      text: 'Performance',
      progress: performancePercent,
      value: performance,
    },
    {
      class: 'technique',
      text: 'Technique',
      progress: techniquePercent,
      value: technique,
    },
    {
      class: 'visual',
      text: 'Visual',
      progress: visualPercent,
      value: visual,
    },
    {
      class: 'overall',
      text: 'Overall',
      progress: overallPercent,
      value: overall,
    },
  ];

  const stats = statsArray.map((s) => {
    return (
      <CardStat
        key={s.class}
        class={s.class}
        text={s.text}
        progress={s.progress}
        value={s.value}
      />
    );
  });

  let maxStat;
  switch (data.i_rarity) {
    case 1:
      maxStat = 'Level 20';
      break;
    case 2:
      maxStat = 'Level 30';
      break;
    case 3:
      maxStat = 'Level 40';
      break;
    case 4:
      maxStat = 'Level 50';
  }

  const detailsArray = [
    {
      class: 'name',
      text: 'Name',
      value: data.name !== null ? data.name : data.japanese_name,
    },
    {
      class: 'member',
      text: 'Member',
      value: (
        <Link to={`/characters/${member.id}`}>
          <img
            src={member.square_image}
            alt={member.name}
            title={member.name}
          />
        </Link>
      ),
    },
    {
      class: 'rarity',
      text: 'Rarity',
      value: rarity,
    },
    {
      class: 'attribute',
      text: 'Attribute',
      value: (
        <>
          {data.i_attribute}
          <span>
            <img
              src={`https://i.bandori.party/static/img/i_attribute/${attributeIcon}.png`}
              alt={data.i_attribute}
            />
          </span>
        </>
      ),
    },
    {
      class: 'skill',
      text: 'Skill name',
      value:
        data.skill_name !== null ? data.skill_name : data.japanese_skill_name,
    },
    {
      class: 'icon',
      text: 'Icon',
      value: (
        <>
          <span>
            <img src={data.image} alt={data.name} />
          </span>
          {data.image_trained !== null && (
            <span>
              <img src={data.image_trained} alt={data.name} />
            </span>
          )}
        </>
      ),
    },
    {
      class: 'release-date',
      text: 'Release date',
      value: data.release_date,
    },
  ];

  const details = detailsArray.map((d) => {
    return (
      <Detail key={d.class} class={d.class} text={d.text} value={d.value} />
    );
  });

  return !data || isLoading ? (
    <Preloader />
  ) : (
    <div className="card-detail">
      <div className="art">
        <div className="btn-wrapper">
          <button
            className={`btn-normal-art${!isTrained ? ' active' : ''}`}
            onClick={() => setIsTrained(false)}
          >
            Normal Art
          </button>
          {data.art_trained !== null && (
            <button
              className={`btn-trained-art${isTrained ? ' active' : ''}`}
              onClick={() => setIsTrained(true)}
            >
              Trained Art
            </button>
          )}
        </div>
        <figure>
          <img
            src={data.art}
            alt={data.name}
            className="normal-art responsive-img"
            style={{ display: isTrained && 'none' }}
          />
          <img
            src={data.art_trained}
            alt={data.name}
            className="trained-art responsive-img"
            style={{ display: !isTrained && 'none' }}
          />
        </figure>
      </div>
      <div className="info">
        <div
          className="stat-selector"
          style={
            data.i_rarity > 2
              ? { gridTemplateColumns: '1fr 1fr 1fr' }
              : { gridTemplateColumns: '1fr 1fr' }
          }
        >
          <button
            className={`min-btn${stat === 0 ? ' active' : ''}`}
            onClick={() => setStat(0)}
          >
            Level 1
          </button>
          <button
            className={`max-btn${stat === 1 ? ' active' : ''}`}
            onClick={() => setStat(1)}
          >
            {maxStat}
          </button>
          {data.i_rarity > 2 && (
            <button
              className={`trained-max-btn${stat === 2 ? ' active' : ''}`}
              onClick={() => setStat(2)}
            >
              {data.i_rarity === 4 ? 'Level 60' : 'Level 50'}
            </button>
          )}
        </div>
        <div className="stat">{stats}</div>
        <div className="detail">{details}</div>
      </div>
    </div>
  );
}
