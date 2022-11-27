import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Preloader from '../components/Preloader';
import members from '../data/members';

export default function CardsList() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState('');
  const [userInput, setUserInput] = useState(page);
  const [isLoading, setIsLoading] = useState(false);

  const changePage = (event) => {
    event.preventDefault();
    setPage(userInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await axios
        .get(`https://bandori.party/api/cards/?page=${page}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
      setIsLoading(false);
    };
    fetchData();
    document.title = `Card List - Page ${page}`;
  }, [page]);

  let results, totalPage;
  if (data) {
    totalPage = Math.ceil(data.count / 10);
    // Card list
    results = data.results.map((result) => {
      const member = members.find((m) => m.id === result.member);
      // Stars
      const rarityValue = result.i_rarity;
      const rarity = [...Array(rarityValue)].map((e, i) => {
        return (
          <img
            src="https://i.bandori.party/static/img/star_untrained.png"
            alt="Star"
            width="15px"
            key={`star-${i}`}
          />
        );
      });

      return (
        <Link to={`/cards/${result.id}`} className="card" key={result.id}>
          <figure>
            <div className="rarity">{rarity}</div>
            <img
              src={result.art}
              alt={result.japanese_name}
              className="card-art"
              loading="lazy"
            />
          </figure>
          <div className="info">
            <div className="name">
              {result.name !== null ? result.name : result.japanese_name}
            </div>
            <div className="characters">{member.name}</div>
          </div>
          <div className="icon">
            <Icon icon="material-symbols:keyboard-double-arrow-right-rounded" />
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="card-list">
      <div className="title">Cards List</div>
      <form className="page-navigator" onSubmit={(event) => changePage(event)}>
        Page{' '}
        <input
          type="number"
          min={1}
          max={totalPage}
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />{' '}
        of {totalPage}.
      </form>
      {!data || isLoading ? <Preloader /> : [results]}
    </div>
  );
}
