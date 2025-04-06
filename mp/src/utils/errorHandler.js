/**
 * Utility for handling errors gracefully in the application
 */

// Safely access object properties without throwing errors
export const safeAccess = (obj, path, fallback = null) => {
  try {
    if (!obj) return fallback;
    
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === undefined || result === null) return fallback;
      result = result[key];
    }
    
    return result === undefined ? fallback : result;
  } catch (error) {
    return fallback;
  }
};

// Safe function executor that won't crash the app
export const safeExecute = (fn, ...args) => {
  try {
    if (typeof fn !== 'function') return null;
    return fn(...args);
  } catch (error) {
    console.log('Error executing function:', error);
    return null;
  }
};

// Convert potential error-prone data to safe format
export const sanitizeData = (data) => {
  if (!data) return {};
  
  try {
    // Return a clean copy without functions or circular references
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return {};
  }
}; 