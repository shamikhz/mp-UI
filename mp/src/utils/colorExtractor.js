import { safeAccess } from './errorHandler';

const songColors = {
  1: { start: '#4F1C15', end: '#0E0E0E' }, // Starboy
  2: { start: '#253D57', end: '#131A21' }, // Demons
  3: { start: '#39393E', end: '#0E0E0F' }, // Mouth of the river
  4: { start: '#204A5A', end: '#0F1C22' }, // Ghost Stories
  5: { start: '#4D4439', end: '#171512' }, // Sparks
  6: { start: '#3F3A4B', end: '#1A161E' }, // Viva La Vida
  7: { start: '#5C4C39', end: '#1D1912' }, // Hymn for the weekend
  8: { start: '#2D2D33', end: '#111112' }, // Pain
};

// Default colors to use if any issues occur
const defaultColors = { start: '#1E3264', end: '#121212' };

// Get a gradient for a song
export const getGradientFromSong = (song) => {
  try {
    if (!song) return getDefaultGradient();
    
    // Safely access song ID
    const songId = safeAccess(song, 'id');
    if (!songId) return getDefaultGradient();
    
    // Get colors for this song ID
    const colors = songColors[songId] || defaultColors;
    return `linear-gradient(180deg, ${colors.start} 0%, ${colors.end} 100%)`;
  } catch (error) {
    // Silently fail and return default gradient
    return getDefaultGradient();
  }
};

// Helper function to get default gradient
const getDefaultGradient = () => {
  return `linear-gradient(180deg, ${defaultColors.start} 0%, ${defaultColors.end} 100%)`;
};
