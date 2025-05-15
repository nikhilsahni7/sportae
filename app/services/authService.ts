import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Storage keys for persistent data
export const STORAGE_KEYS = {
  USER: "@sportae:user",
  TOKEN: "@sportae:token",
  SOCKET_TOKEN: "@sportae:socketToken",
};

// Helper function to set auth headers
export const setAuthHeaders = (token: string, userId: string) => {
  axios.defaults.headers.common["token"] = token;
  axios.defaults.headers.common["id"] = userId;
};

// Helper function to clear auth headers
export const clearAuthHeaders = () => {
  delete axios.defaults.headers.common["token"];
  delete axios.defaults.headers.common["id"];
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    const user = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return !!(token && user);
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
};

// Get stored user data
export const getStoredUser = async () => {
  try {
    const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  } catch (error) {
    console.error("Error getting stored user:", error);
    return null;
  }
};

// Get auth token
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};
