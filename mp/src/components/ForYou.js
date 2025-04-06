import React from 'react';
import SongList from './SongList';
import SearchBar from './SearchBar';
import useMusicPlayer from '../hooks/useMusicPlayer';

const ForYou = () => {
  const { filteredSongs, searchTerm } = useMusicPlayer();

  return (
    <div className="for-you">
      <h1 className="page-title">For You</h1>
      <SearchBar />
      {filteredSongs.length > 0 ? (
        <SongList songs={filteredSongs} />
      ) : (
        <p>No songs found matching "{searchTerm}"</p>
      )}
    </div>
  );
};

export default ForYou; 