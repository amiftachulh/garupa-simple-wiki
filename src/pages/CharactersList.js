import React, { useEffect } from 'react';
import Band from '../components/Band';

export default function CharactersList() {
  useEffect(() => {
    document.title = 'Characters List';
  }, []);

  const bandsArray = [
    "Poppin'Party",
    'Afterglow',
    'Pastel*Palettes',
    'Roselia',
    'Hello, Happy World!',
    'Morfonica',
    'RAISE A SUILEN',
  ];

  const bands = bandsArray.map((band) => {
    return <Band key={band} bandName={band} />;
  });

  return (
    <div className="character-list">
      <div className="title">Characters List</div>
      {bands}
    </div>
  );
}
