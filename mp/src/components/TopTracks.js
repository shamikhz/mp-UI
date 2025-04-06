import React from 'react';
import SongList from './SongList';
import useMusicPlayer from '../hooks/useMusicPlayer';

const TopTracks = () => {
  const { songs } = useMusicPlayer();

  const topTracks = [...songs];

  return (
    <div className="top-tracks">
      <h1 className="page-title">Top Tracks</h1>
      <SongList songs={topTracks} />
    </div>
  );
};

export default TopTracks; 