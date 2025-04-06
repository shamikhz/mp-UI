import React from 'react';
import { FaPlay, FaEllipsisH, FaHeart } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import useMusicPlayer from '../hooks/useMusicPlayer';

const SongList = ({ songs }) => {
  const { 
    currentSong,
    playSong, 
    toggleFavorite 
  } = useMusicPlayer();

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <button
      className="options-btn"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FaEllipsisH />
    </button>
  ));

  return (
    <table className="song-list">
      <thead>
        <tr>
          <th style={{ width: '40px' }}>#</th>
          <th>TITLE</th>
          <th style={{ width: '100px', textAlign: 'right' }}>DURATION</th>
          <th style={{ width: '40px' }}></th>
        </tr>
      </thead>
      <tbody>
        {songs.map((song, index) => (
          <tr 
            key={song.id} 
            className={currentSong && currentSong.id === song.id ? 'active' : ''}
            onClick={() => playSong(song)}
          >
            <td>
              <div className="song-info">
                <div className="song-info__index">{index + 1}</div>
                <div className="song-info__play">
                  <FaPlay />
                </div>
              </div>
            </td>
            <td>
              <div className="song-info">
                <div 
                  className="song-info__img" 
                  style={{ backgroundImage: `url(${song.thumbnail})` }}
                ></div>
                <div className="song-info__details">
                  <div className="title">{song.title}</div>
                  <div className="artist">{song.artistName}</div>
                </div>
              </div>
            </td>
            <td className="song-duration">{song.duration}</td>
            <td className="song-options">
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id={`dropdown-${song.id}`} />
                <Dropdown.Menu>
                  <Dropdown.Item 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(song.id);
                    }}
                  >
                    <FaHeart style={{ marginRight: '8px', color: song.isFavorite ? '#1db954' : 'inherit' }} />
                    {song.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SongList; 