import React, { createContext, useState, useEffect } from 'react';
import musicData from '../data/musicData';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState(musicData);
  const [currentSong, setCurrentSong] = useState(musicData[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState(musicData);
  const [currentTab, setCurrentTab] = useState('For You');

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
      
      // Update songs with favorite status
      setSongs(prevSongs => {
        return prevSongs.map(song => {
          const isFav = JSON.parse(storedFavorites).some(fav => fav.id === song.id);
          return { ...song, isFavorite: isFav };
        });
      });
    }
  }, []);

  // Load recently played from sessionStorage
  useEffect(() => {
    const storedRecentlyPlayed = sessionStorage.getItem('recentlyPlayed');
    if (storedRecentlyPlayed) {
      setRecentlyPlayed(JSON.parse(storedRecentlyPlayed));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save recently played to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
  }, [recentlyPlayed]);

  // Filter songs based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song => 
        song.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchTerm, songs]);

  // Play a song and add to recently played
  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    
    // Add to recently played
    setRecentlyPlayed(prev => {
      // Remove the song if it's already in the list
      const filtered = prev.filter(s => s.id !== song.id);
      // Add the song to the beginning
      const updated = [song, ...filtered];
      // Keep only the 10 most recent
      return updated.slice(0, 10);
    });
  };

  // Toggle play/pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle favorite status
  const toggleFavorite = (songId) => {
    // Update songs array
    setSongs(prevSongs => {
      return prevSongs.map(song => {
        if (song.id === songId) {
          return { ...song, isFavorite: !song.isFavorite };
        }
        return song;
      });
    });

    // Update favorites array
    const song = songs.find(s => s.id === songId);
    if (song) {
      if (song.isFavorite) {
        // Remove from favorites
        setFavorites(prev => prev.filter(s => s.id !== songId));
      } else {
        // Add to favorites
        setFavorites(prev => [...prev, { ...song, isFavorite: true }]);
      }
    }

    // Update current song if it's the one being toggled
    if (currentSong && currentSong.id === songId) {
      setCurrentSong(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  // Play next song
  const playNext = () => {
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  };

  // Play previous song
  const playPrevious = () => {
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(songs[prevIndex]);
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        currentSong,
        isPlaying,
        recentlyPlayed,
        favorites,
        searchTerm,
        filteredSongs,
        currentTab,
        playSong,
        togglePlay,
        toggleFavorite,
        setSearchTerm,
        playNext,
        playPrevious,
        setCurrentTab
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}; 