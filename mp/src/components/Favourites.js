import React from 'react';
import SongList from './SongList';
import useMusicPlayer from '../hooks/useMusicPlayer';

const Favourites = () => {
  const { favorites } = useMusicPlayer();

  return (
    <div className="favourites">
      <h1 className="page-title">Favourites</h1>
      {favorites.length > 0 ? (
        <SongList songs={favorites} />
      ) : (
        <p>No favourite songs yet. Add some by clicking the heart icon.</p>
      )}
    </div>
  );
};

export default Favourites; 