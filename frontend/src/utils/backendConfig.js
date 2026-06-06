/**
 * Backend configuration utility for SmartLight
 * Handles both web and Electron environments
 */

const DEFAULT_BACKEND_URL = 'http://10.1.1.93:5000';
const STORAGE_KEY = 'smartlight_backend_url';

// Check if running in Electron
export const isElectron = () => {
  return typeof window !== 'undefined' && typeof window.electronAPI !== 'undefined';
};

// Get current backend URL
export const getBackendUrl = async () => {
  try {
    if (isElectron()) {
      const config = await window.electronAPI.getConfig();
      return config.backendUrl;
    } else {
      // Web environment - use localStorage
      return localStorage.getItem(STORAGE_KEY) || DEFAULT_BACKEND_URL;
    }
  } catch (error) {
    console.error('Error getting backend URL:', error);
    return DEFAULT_BACKEND_URL;
  }
};

// Set backend URL
export const setBackendUrl = async (url) => {
  try {
    if (isElectron()) {
      const config = { backendUrl: url };
      await window.electronAPI.saveConfig(config);
      return { success: true };
    } else {
      // Web environment - use localStorage
      localStorage.setItem(STORAGE_KEY, url);
      return { success: true };
    }
  } catch (error) {
    console.error('Error setting backend URL:', error);
    return { success: false, error };
  }
};

// Create API URL for endpoints
export const getApiUrl = async (endpoint) => {
  const baseUrl = await getBackendUrl();
  return `${baseUrl}${endpoint}`;
};
