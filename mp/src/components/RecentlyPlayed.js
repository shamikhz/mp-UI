import React from 'react';
import SongList from './SongList';
import useMusicPlayer from '../hooks/useMusicPlayer';

const RecentlyPlayed = () => {
  const { recentlyPlayed } = useMusicPlayer();

  return (
    <div className="recently-played">
      <h1 className="page-title">Recently Played</h1>
      {recentlyPlayed.length > 0 ? (
        <SongList songs={recentlyPlayed} />
      ) : (
        <p>No recently played songs. Play some tracks to see them here.</p>
      )}
    </div>
  );
};

export default RecentlyPlayed; 