import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function About() {
  useEffect(() => {
    document.title = 'About';
  }, []);

  return (
    <div className="about">
      <div className="title">About</div>
      <p className="content">
        <div className="desc">
          This website is a simple wiki of BanG Dream! Girls Band Party created
          with React. I made this website to fulfill the final assignment of
          Mobile Device Programming class. There are 5 pages in this website.
          Cards List to show all cards (max 10 per page), Card Detail to show a
          card stat, Characters List to show all the characters in this game,
          Character Detail to show the character bio, and About page.
        </div>
        <div className="author">
          <figure>
            <img
              src="https://avatars.githubusercontent.com/u/81857387?v=4"
              alt="A.Miftachul Hidayat"
              className="responsive-img"
            />
          </figure>
          <div className="name">A.Miftachul Hidayat</div>
          <div className="social">
            <div className="github">
              <a href="https://github.com/amiftachulh" target="_blank">
                <Icon icon="mdi:github" />
              </a>
            </div>
            <div className="linkedin">
              <a href="https://www.linkedin.com/in/amiftachulh/" target="_blank">
                <Icon icon="mdi:linkedin" />
              </a>
            </div>
          </div>
        </div>
      </p>
    </div>
  );
}
