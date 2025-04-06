import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeDown, FaVolumeMute, FaHeart } from 'react-icons/fa';
import useMusicPlayer from '../hooks/useMusicPlayer';
import { safeExecute } from '../utils/errorHandler';
import { formatTime, parseDuration, isSupportedAudioFormat } from '../utils/audioUtils';

const Player = () => {
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    playNext, 
    playPrevious,
    toggleFavorite 
  } = useMusicPlayer();
  
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [useAudioElement, setUseAudioElement] = useState(true);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  // Set duration when song changes
  useEffect(() => {
    if (currentSong) {
      // Reset audio error state for new song
      setAudioError(false);
      
      // Check if audio format is supported
      if (currentSong.musicUrl && !isSupportedAudioFormat(currentSong.musicUrl)) {
        console.log("Unsupported audio format:", currentSong.musicUrl);
        setAudioError(true);
        setUseAudioElement(false);
      }
      
      // Parse duration from string
      const songDuration = parseDuration(currentSong.duration);
      setDuration(songDuration);
      setCurrentTime(0);
    }
  }, [currentSong]);

  // Handle audio element errors
  const handleAudioError = () => {
    console.log("Audio error occurred, falling back to mock player");
    setAudioError(true);
    setUseAudioElement(false);
  };

  // Handle audio element successful load
  const handleCanPlay = () => {
    setAudioError(false);
    setUseAudioElement(true);
  };

  // Audio element event handlers
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    
    const handleEnded = () => {
      safeExecute(playNext);
    };
    
    // Add event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleAudioError);
    audio.addEventListener('canplay', handleCanPlay);
    
    // Clean up
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleAudioError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [playNext]);

  // Play/pause with native audio element
  useEffect(() => {
    if (!audioRef.current || audioError) return;
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Playback error:', error);
          handleAudioError();
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioError]);

  // Mock playback functionality (fallback)
  useEffect(() => {
    // Only use mock player if audio element failed
    if (!audioError && useAudioElement) return;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (currentSong && isPlaying) {
      // Start mock playback timer
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          // If reached the end of the song
          if (newTime >= duration) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            // Trigger next song
            safeExecute(playNext);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentSong, isPlaying, duration, playNext, audioError, useAudioElement]);

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle progress bar click
  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.clientWidth;
    const seekTime = (clickPosition / progressBarWidth) * duration;
    
    setCurrentTime(seekTime);
    
    // Update audio element if it's being used
    if (!audioError && useAudioElement && audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    // Update audio element volume
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  // Render volume icon based on volume level
  const renderVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <FaVolumeMute onClick={toggleMute} />;
    } else if (volume < 0.5) {
      return <FaVolumeDown onClick={toggleMute} />;
    } else {
      return <FaVolumeUp onClick={toggleMute} />;
    }
  };

  return (
    <div className="player">
      {/* Hidden audio element */}
      {!audioError && (
        <audio 
          ref={audioRef} 
          src={currentSong?.musicUrl} 
          preload="metadata"
        />
      )}
      
      {/* Song info */}
      <div className="player__song-info">
        {currentSong && (
          <>
            <div 
              className="thumbnail" 
              style={{ backgroundImage: `url(${currentSong.thumbnail})` }}
            ></div>
            <div className="info">
              <div className="song-title">{currentSong.title}</div>
              <div className="artist">{currentSong.artistName}</div>
            </div>
            <button 
              className={`favorite-btn ${currentSong.isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(currentSong.id)}
            >
              <FaHeart />
            </button>
          </>
        )}
      </div>
      
      {/* Controls */}
      <div className="player__controls">
        <div className="buttons">
          <button onClick={playPrevious}>
            <FaStepBackward />
          </button>
          <button className="play-pause" onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={playNext}>
            <FaStepForward />
          </button>
        </div>
        
        <div className="progress">
          <div className="current-time">{formatTime(currentTime)}</div>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div 
              className="progress-current" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="duration">{formatTime(duration)}</div>
        </div>
      </div>
      
      {/* Volume */}
      <div className="player__volume">
        <div className="volume-icon">
          {renderVolumeIcon()}
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default Player; 