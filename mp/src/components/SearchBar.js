import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import useMusicPlayer from '../hooks/useMusicPlayer';

const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useMusicPlayer();
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchTerm('');
  };
  
  return (
    <div className="search-bar">
      <FaSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search Songs, Artist"
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <FaTimes
          className="clear-btn visible"
          onClick={clearSearch}
        />
      )}
    </div>
  );
};

export default SearchBar; 