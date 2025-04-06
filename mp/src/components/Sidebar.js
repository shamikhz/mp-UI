import React from 'react';
import { FaHome, FaSearch, FaHeart, FaHistory, FaTimes } from 'react-icons/fa';
import { ReactComponent as SpotifyLogo } from '../assets/images/spotify-logo.svg';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Sidebar = ({ isOpen, onClose }) => {
  const { currentTab, setCurrentTab } = useMusicPlayer();

  const handleMenuClick = (tab) => {
    setCurrentTab(tab);
    if (window.innerWidth <= 480) {
      onClose();
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-sidebar" onClick={onClose}>
        <FaTimes />
      </button>
      
      <div className="logo">
        <div className="logo-container">
          <SpotifyLogo className="logo-icon" alt="Spotify" />
          <span className="logo-text">Sportify</span>
        </div>
      </div>
      
      <ul className="menu">
        <li>
          <a 
            href="#/" 
            className={currentTab === 'For You' ? 'active' : ''} 
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('For You');
            }}
          >
            <FaHome className="icon" />
            <span className="menu-text">For You</span>
          </a>
        </li>
        <li>
          <a 
            href="#/" 
            className={currentTab === 'Search' ? 'active' : ''} 
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('Search');
            }}
          >
            <FaSearch className="icon" />
            <span className="menu-text">Search</span>
          </a>
        </li>
        <li>
          <a 
            href="#/" 
            className={currentTab === 'Favourites' ? 'active' : ''} 
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('Favourites');
            }}
          >
            <FaHeart className="icon" />
            <span className="menu-text">Favourites</span>
          </a>
        </li>
        <li>
          <a 
            href="#/" 
            className={currentTab === 'Recently Played' ? 'active' : ''} 
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('Recently Played');
            }}
          >
            <FaHistory className="icon" />
            <span className="menu-text">Recently Played</span>
          </a>
        </li>
      </ul>
      
      <div className="divider"></div>
      
      <ul className="menu">
        <li>
          <a 
            href="#/" 
            className={currentTab === 'Top Tracks' ? 'active' : ''} 
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick('Top Tracks');
            }}
          >
            <span className="menu-text">Top Tracks</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar; 