import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import { Icon } from '@iconify/react';
import CardsList from './pages/CardsList.js';
import CardDetail from './pages/CardDetail';
import CharactersList from './pages/CharactersList';
import CharacterDetail from './pages/CharacterDetail';
import About from './pages/About';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <header>BanG Dream! Girls Band Party</header>
        <Routes>
          <Route path="/" element={<CardsList />} />
          <Route path="/cards/:id" element={<CardDetail />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <footer>
          <NavLink to="/">
            <Icon icon="mdi:cards" />
            <div className="link-text">Cards</div>
          </NavLink>
          <NavLink to="/characters">
            <Icon icon="mdi:user-group" />
            <div className="link-text">Characters</div>
          </NavLink>
          <NavLink to="/about">
            <Icon icon="mdi:about" />
            <div className="link-text">About</div>
          </NavLink>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
