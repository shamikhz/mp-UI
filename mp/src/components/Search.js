import React from 'react';
import SongList from './SongList';
import SearchBar from './SearchBar';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Search = () => {
  const { filteredSongs, searchTerm } = useMusicPlayer();

  return (
    <div className="search">
      <h1 className="page-title">Search</h1>
      <SearchBar />
      {searchTerm ? (
        <>
          <h2 className="section-title">Search Results for "{searchTerm}"</h2>
          {filteredSongs.length > 0 ? (
            <SongList songs={filteredSongs} />
          ) : (
            <p>No songs found matching "{searchTerm}"</p>
          )}
        </>
      ) : (
        <p>Type something to search for songs</p>
      )}
    </div>
  );
};

export default Search; 