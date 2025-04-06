// Check if an audio file is supported or exists
export const checkAudioFileSupport = async (url) => {
  if (!url) return false;
  
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.log('Audio file check failed:', error);
    return false;
  }
};

// List of supported audio formats
const supportedFormats = ['.mp3', '.wav', '.ogg', '.aac', '.m4a'];

// Check if the file format is supported
export const isSupportedAudioFormat = (url) => {
  if (!url) return false;
  
  const lowercaseUrl = url.toLowerCase();
  return supportedFormats.some(format => lowercaseUrl.endsWith(format));
};

// Format duration in MM:SS
export const formatTime = (time) => {
  if (isNaN(time) || time < 0) return '0:00';
  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

// Parse duration string to seconds (format: "M:SS")
export const parseDuration = (durationStr) => {
  if (!durationStr) return 0;
  
  try {
    const [minutes, seconds] = durationStr.split(':').map(Number);
    return (minutes * 60) + seconds;
  } catch (error) {
    console.log('Error parsing duration:', error);
    return 0;
  }
};

// Create Audio object with error handling
export const createSafeAudio = (url, onError) => {
  if (!url) return null;
  
  const audio = new Audio();
  
  // Add error handler
  audio.addEventListener('error', (e) => {
    console.log('Audio error:', e);
    if (typeof onError === 'function') {
      onError(e);
    }
  });
  
  // Set source
  audio.src = url;
  return audio;
}; 