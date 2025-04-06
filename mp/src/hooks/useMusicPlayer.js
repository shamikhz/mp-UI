import { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';

const useMusicPlayer = () => {
  const context = useContext(MusicContext);
  
  if (!context) {
    console.error('useMusicPlayer must be used within a MusicProvider');
    return {
      songs: [],
      currentSong: null,
      isPlaying: false,
      recentlyPlayed: [],
      favorites: [],
      searchTerm: '',
      filteredSongs: [],
      currentTab: 'For You',
      playSong: () => {},
      togglePlay: () => {},
      toggleFavorite: () => {},
      setSearchTerm: () => {},
      playNext: () => {},
      playPrevious: () => {},
      setCurrentTab: () => {}
    };
  }
  
  return context;
};

export default useMusicPlayer; 